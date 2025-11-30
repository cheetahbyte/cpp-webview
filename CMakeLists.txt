cmake_minimum_required(VERSION 3.21)

# ------------------------------------------------------------------------------
# 1. Project Configuration
# ------------------------------------------------------------------------------
project(Todos LANGUAGES CXX OBJCXX VERSION 1.0.0)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# ------------------------------------------------------------------------------
# 2. Dependencies
# ------------------------------------------------------------------------------
include(FetchContent)

FetchContent_Declare(
    saucer
    GIT_REPOSITORY "https://github.com/saucer/saucer"
    GIT_TAG v7.0.2
)
FetchContent_MakeAvailable(saucer)

# ------------------------------------------------------------------------------
# 3. Source & Platform Logic
# ------------------------------------------------------------------------------
set(PROJECT_SOURCES "src/main.cpp")
set(PROJECT_LIBRARIES "")

if(APPLE)
    # macOS Specific Configuration
    set(MACOS_APP_ICON "${CMAKE_CURRENT_SOURCE_DIR}/resources/AppIcon.icns")
    set_source_files_properties(${MACOS_APP_ICON} PROPERTIES MACOSX_PACKAGE_LOCATION Resources)

    # Add Mac-specific sources
    list(APPEND PROJECT_SOURCES
        "src/menu_mac.mm"
        "${MACOS_APP_ICON}"
    )

    # Find and link Cocoa
    find_library(COCOA_FRAMEWORK Cocoa)
    list(APPEND PROJECT_LIBRARIES ${COCOA_FRAMEWORK})
endif()

# ------------------------------------------------------------------------------
# 4. Target Definition
# ------------------------------------------------------------------------------
add_executable(${PROJECT_NAME} MACOSX_BUNDLE)

target_sources(${PROJECT_NAME} PRIVATE ${PROJECT_SOURCES})

# ------------------------------------------------------------------------------
# 5. Saucer Embed & Configuration
# ------------------------------------------------------------------------------
saucer_embed("./ui/dist")

target_compile_features(${PROJECT_NAME} PRIVATE cxx_std_23)

target_link_libraries(${PROJECT_NAME} PRIVATE
    saucer::saucer
    saucer::embedded
    ${PROJECT_LIBRARIES}
)

# ------------------------------------------------------------------------------
# 6. Bundle Properties (macOS)
# ------------------------------------------------------------------------------
if(APPLE)
    set_target_properties(${PROJECT_NAME} PROPERTIES
        MACOSX_BUNDLE_BUNDLE_NAME "Todos"
        MACOSX_BUNDLE_GUI_IDENTIFIER "de.leonhardbreuer.Todos"
        MACOSX_BUNDLE_ICON_FILE "AppIcon.icns"
        MACOSX_BUNDLE_INFO_STRING "Todos v1.0"
        MACOSX_BUNDLE_SHORT_VERSION_STRING "${PROJECT_VERSION_MAJOR}.${PROJECT_VERSION_MINOR}"
        MACOSX_BUNDLE_BUNDLE_VERSION "${PROJECT_VERSION}"
        MACOSX_BUNDLE_COPYRIGHT "Copyright © 2025"
    )
endif()
