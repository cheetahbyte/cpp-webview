#include <print>
#include <saucer/smartview.hpp>
#include <saucer/embedded/all.hpp>
#include <iostream>

coco::stray start(saucer::application *app)
{
    auto window  = saucer::window::create(app).value();
    auto webview = saucer::smartview<>::create({.window = window});


    window->set_title("Hello World!");
    window->set_min_size({800, 600});

    webview->expose("toggle_devtools", [&]() {
        bool current_state = webview->dev_tools();
        webview->set_dev_tools(!current_state);

        std::cout << "DevTools enabled: " << (!current_state) << std::endl;
    });

    webview->embed(saucer::embedded::all());
    webview->serve("/index.html");

    window->show();


    co_await app->finish();
}

int main()
{
    return saucer::application::create({.id = "hello-world"})->run(start);
}
