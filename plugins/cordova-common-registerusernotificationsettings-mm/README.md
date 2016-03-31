
Temporary Fork of Cordova RegisterUserNotificationSettings Plugin to hot-fix PGB build problem for Moodle Mobile application.

Cordova RegisterUserNotificationSettings Plugin
===============================================

Implements didRegisterUserNotificationSettings and broadcasts the event for listening plugins.

```obj-c
#import "AppDelegate+APPRegisterUserNotificationSettings.h"

- (void) pluginInitialize
{
    NSNotificationCenter* center = [NSNotificationCenter
                                    defaultCenter];

    [center addObserver:self
               selector:@selector(didRegisterUserNotificationSettings:)
                   name:UIApplicationRegisterUserNotificationSettings
                 object:nil];
}

- (void) didRegisterUserNotificationSettings:(UIUserNotificationSettings*)settings
{
    ...  
}
```