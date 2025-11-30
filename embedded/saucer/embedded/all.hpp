#pragma once

#include <saucer/webview.hpp>

#include "files/assets/index-DKUtWA6L.js.hpp"
#include "files/index.html.hpp"
#include "files/index_html.h.hpp"
#include "files/vite.svg.hpp"

namespace saucer::embedded
{
    inline std::unordered_map<fs::path, embedded_file> all()
    {
        using namespace files;

        return {
            {"/assets/index-DKUtWA6L.js", saucer::embedded_file{.content = saucer::stash<>::view(_32384eda27a6d383), .mime = "application/javascript"}},
			{"/index.html", saucer::embedded_file{.content = saucer::stash<>::view(_4e205bbd9712ea7f), .mime = "text/html"}},
			{"/index_html.h", saucer::embedded_file{.content = saucer::stash<>::view(_4aa196b01c2e9326), .mime = "text/x-c"}},
			{"/vite.svg", saucer::embedded_file{.content = saucer::stash<>::view(_67284edc0ae4f1db), .mime = "image/svg+xml"}}
        };
    }
} // namespace saucer::embedded
