# plugin_sg_pwa
![](https://raw.githubusercontent.com/vsanse/plugin_sg_pwa/master/plugin_sg_pwa/cartridge/static/default/images/icons/icon-128x128.png)

### Prerequisite

- HTTPS enabled website

### Cartridge Download

Get latest verion from [Releases](https://github.com/vsanse/plugin_sg_pwa/releases)

### Steps to add PWA support
                
1. add "plugin_sg_pwa " cartridge to site path

    Administration > Manage Sites > [Your Site ] > Settings > Cartridges
2. Create URL aliases for controllers:- Pwa-SW, Pwa-Manifest
    
    Merchant Tools >  SEO >  URL Rules > Pipeline URLs > New Alias
3. Include **pwa/register** template in head tag of your site e.g: htmlHead.isml
4. Add new property file named pwa.properties to your site cartrige to update manifest.json file with your site name, theme, icons and To updated offline fallback page for your site.
5. **[Optional]** Add new template "pwa/static_assets.isml" if you want to override cache file on first load and add pages to be cached in Service worker in form of array: e.g:
	```
	[
        "${URLUtils.https("Pwa-Offline")}",<=== [MANDATORY TO ADD IN THIS FILE IF OVERRIDING]
        "${URLUtils.staticURL('/css/app.min.css')}",
        "${URLUtils.staticURL('/js/app.min.js')}"
    ]
    ```
6. **[Optional]** You may want to design your own offline page so create new template "pwa/offline.isml" in your site cartridge it will override default offline template in plugin cartridge.


### Features
1. #### Extend Manifest and Service worker
    Feeling adventurous? Want to add more cool functionalitites to your PWA?

    + **To add more configurations to your manifest.json:**
        1. In your site cartridge's pwa.properties file add line
            ```
            pwa.app.manifest.extended=true
            ```
        2. Create file **manifest_extended.isml** under **pwa** folder in templates of your site cartridge

    + **To add more functionalities to your service worker:**
        1. In your site cartridge's pwa.properties file add line
            ```
            pwa.app.sw.extended=true
            ```
        2. Create file **sw_extended.isml** under **pwa** folder in templates of your site cartridge

    + **To override fetch method of service worker**
        1. In your site cartridge's pwa.properties file add line
            ```
            pwa.app.sw.fetch.override=true
            ```
        2. Create file **sw_fetch_override.isml** under **pwa** folder in templates of your site cartridge

        
2. #### SkipWaiting(): to ensures any new versions of a service worker take over the page and become activated immediately.
    **Note:** This is true by default so you may not need to add this line to your site cartridge's pwa.properties file
    ```
    pwa.app.skipWaiting=true
    ```
3. #### Choose you cache strategy
    Currently you have a choice of 3 types of cache strategies.
    Cache Strategy can be defined using keywords  Cache First=CF, Network First=NF, Cache Then Network=CTN. For e.g.
    ```
    pwa.app.sw.cahe.strategy=CTN
    ```
    **Note** CTN is default cache strategy so you may not need to add this line to your site cartridge's pwa.properties file unless you want to override it
    
### Using with SFRA

Simply convert controller Pwa to SFRA routes and will work same as in SiteGenesis

### Upcoming
1. ~~Choose type of cache pattern to use: Cache-First, Network-First, Network-Only etc.~~
2. Any other feature on request.
