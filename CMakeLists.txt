cmake_minimum_required(VERSION 3.16)
project(app LANGUAGES CXX)

# --- Output Settings ---
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# --- Dependencies ---
set(WEBVIEW_WEBKITGTK_API 6.0)

include(FetchContent)

# 1. WebView
FetchContent_Declare(
        webview
        GIT_REPOSITORY https://github.com/webview/webview
        GIT_TAG 0.12.0
)
FetchContent_MakeAvailable(webview)

# 2. Nlohmann Json
FetchContent_Declare(
        json
        GIT_REPOSITORY https://github.com/nlohmann/json
        GIT_TAG v3.12.0
)
FetchContent_MakeAvailable(json)

# --- Platform & Icon Configuration ---

# Path to your icon file
set(ICON_SOURCE "${CMAKE_CURRENT_SOURCE_DIR}/resources/AppIcon.icns")
set(EXTRA_SOURCES "ui/dist/index_html.h") # Include generated header so IDE sees it

if(APPLE)
    # macOS: Needs MACOSX_BUNDLE flag and the Icon file in sources
    set(APP_TYPE MACOSX_BUNDLE)

    # Add the Objective-C++ file to the sources
    list(APPEND EXTRA_SOURCES src/menu_mac.mm)

    list(APPEND EXTRA_SOURCES ${ICON_SOURCE})
    set_source_files_properties(${ICON_SOURCE} PROPERTIES MACOSX_PACKAGE_LOCATION Resources)

    # LINK COCOA FRAMEWORK (Required for NSMenu)
    find_library(COCOA_FRAMEWORK Cocoa)
    set(PLATFORM_LIBS ${COCOA_FRAMEWORK})
elseif(WIN32)
    set(APP_TYPE WIN32)
else()
    set(APP_TYPE ""
            src/menu.h)
endif()

# --- Build Target ---

add_executable(Todos ${APP_TYPE}
        src/main.cpp
        ${EXTRA_SOURCES}
)

# --- macOS Info.plist Configuration ---
if(APPLE)
    set_target_properties(Todos PROPERTIES
            MACOSX_BUNDLE_BUNDLE_NAME "Todos"
            MACOSX_BUNDLE_GUI_IDENTIFIER "de.leonhardbreuer.Todos"
            MACOSX_BUNDLE_ICON_FILE "AppIcon.icns"
            MACOSX_BUNDLE_INFO_STRING "Todos v1.0"
            MACOSX_BUNDLE_SHORT_VERSION_STRING "1.0"
            MACOSX_BUNDLE_BUNDLE_VERSION "1"
            MACOSX_BUNDLE_COPYRIGHT "Copyright © 2025"
    )
endif()

# --- Includes & Links ---
target_include_directories(Todos PRIVATE ui/dist)
target_link_libraries(Todos PRIVATE
        webview::core
        nlohmann_json::nlohmann_json
        ${PLATFORM_LIBS}
)
