#include "menu.h"
#import <Cocoa/Cocoa.h>

void create_macos_menu() {
    // 1. Create the Menu Bar
    NSMenu *menubar = [[NSMenu alloc] init];
    [NSApp setMainMenu:menubar];

    // 2. Create the "App" Menu (The one with the app name)
    NSMenuItem *appMenuItem = [[NSMenuItem alloc] init];
    [menubar addItem:appMenuItem];

    NSMenu *appMenu = [[NSMenu alloc] init];
    [appMenuItem setSubmenu:appMenu];

    // 3. Add "About"
    NSString *appName = [[NSProcessInfo processInfo] processName];
    NSString *aboutTitle = [@"About " stringByAppendingString:appName];
    [appMenu addItemWithTitle:aboutTitle action:@selector(orderFrontStandardAboutPanel:) keyEquivalent:@""];

    [appMenu addItem:[NSMenuItem separatorItem]];

    // 4. Add "Quit" (CMD+Q)
    NSString *quitTitle = [@"Quit " stringByAppendingString:appName];
    NSMenuItem *quitItem = [appMenu addItemWithTitle:quitTitle action:@selector(terminate:) keyEquivalent:@"q"];

    // 5. Add "File", "Edit", etc. as needed...
    // Example: Edit Menu (Cut/Copy/Paste support is important for WebViews!)
    NSMenuItem *editMenuItem = [[NSMenuItem alloc] init];
    [menubar addItem:editMenuItem];
    NSMenu *editMenu = [[NSMenu alloc] initWithTitle:@"Edit"];
    [editMenuItem setSubmenu:editMenu];

    [editMenu addItemWithTitle:@"Cut" action:@selector(cut:) keyEquivalent:@"x"];
    [editMenu addItemWithTitle:@"Copy" action:@selector(copy:) keyEquivalent:@"c"];
    [editMenu addItemWithTitle:@"Paste" action:@selector(paste:) keyEquivalent:@"v"];
    [editMenu addItemWithTitle:@"Select All" action:@selector(selectAll:) keyEquivalent:@"a"];
}