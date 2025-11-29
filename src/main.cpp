#include <iostream>
#include <nlohmann/json.hpp>
#include "webview/webview.h"
#include "index_html.h"

// Include our new header
#ifdef __APPLE__
#include "menu.h"
#endif

using json = nlohmann::json;

#ifdef _WIN32
int WINAPI WinMain(HINSTANCE /*hInst*/, HINSTANCE /*hPrevInst*/,
                   LPSTR /*lpCmdLine*/, int /*nCmdShow*/) {
#else
int main() {
#endif
    try {
        webview::webview main_window(false, nullptr);
        main_window.set_title("App");
        main_window.set_size(1280, 720, WEBVIEW_HINT_NONE);

#ifdef __APPLE__
        create_macos_menu();
#endif

        main_window.set_html(INDEX_HTML);
        main_window.run();
    } catch (const webview::exception &e) {
        std::cerr << e.what() << '\n';
        return 1;
    }

    return 0;
}