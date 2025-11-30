#pragma once

#include <saucer/webview.hpp>

#include "files/assets/index-DfkIRxrr.js.hpp"
#include "files/index.html.hpp"
#include "files/vite.svg.hpp"

namespace saucer::embedded
{
    inline std::unordered_map<fs::path, embedded_file> all()
    {
        using namespace files;

        return {
            {"/assets/index-DfkIRxrr.js", saucer::embedded_file{.content = saucer::stash<>::view(_972b6a86ef810ff6), .mime = "application/javascript"}},
			{"/index.html", saucer::embedded_file{.content = saucer::stash<>::view(_4e205bbd9712ea7f), .mime = "text/html"}},
			{"/vite.svg", saucer::embedded_file{.content = saucer::stash<>::view(_67284edc0ae4f1db), .mime = "image/svg+xml"}}
        };
    }
} // namespace saucer::embedded
