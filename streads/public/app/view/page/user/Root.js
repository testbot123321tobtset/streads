Ext.define('X.view.page.user.Root', {
    extend: 'Ext.tab.Panel',
    requires: [
        'X.view.plugandplay.UserMoreTabPanel'
    ],
    xtype: 'pageuserroot',
    id: 'pageUserRoot',
    config: {
        cls: 'page-user-root',
        tabBarPosition: 'bottom',
        items: [
            {
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                itemId: 'userNews',
                cls: 'user-news',
                title: 'News',
                items: [
                    {
                        flex: 1,
                        html: 'This is the user news feed'
                    }
                ]
            },
            {
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                itemId: 'brandGallery',
                cls: 'brand-gallery',
                title: 'Gallery',
                items: [
                    {
                        flex: 1,
                        html: 'This is the brand gallery! Change this!'
                    }
                ]
            },
            {
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                itemId: 'userMore',
                cls: 'user-more',
                title: 'More',
                items: [
                    {
                        flex: 1,
                        xtype: 'usermoretabpanel'
                    }
                ]
            }
        ]
    }
});
