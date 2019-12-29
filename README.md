![](https://i.imgur.com/YwwLUd5.png)

### What is all the buzz about
What is PWA? Why PWA?.... Before answering that let's have a look at how a user interacts with the digital world. As per study users usually spend 13% of their time on the web and 87% of that on Native apps due to their capabilities like push notification that brings the user back. So does that mean to abandon the web completely? Well... not exactly whereas the user spends most of the time on native apps but when it comes to reachability web surpasses native apps. On an average user installs ZERO apps per month where visits hundreds of websites at the same time. So if your app is not in users' top choice you can forget about it. This gap between native apps' capability and the web's reachability is covered by PWA.

PWA collects the goodness of web reachability as once user visits your website he will be shown [app install banner](https://developers.google.com/web/fundamentals/app-install-banners) hence instead of dedicating an entire page for letting user know where to install your app, you can go on with your business and let browser handle app installs, on the other hand, PWA gets the goodness of native apps from its capabilities like push notification, offline experience and interact with device capabilities like camera, etc.
More at [https://developers.google.com/web/progressive-web-apps](https://developers.google.com/web/progressive-web-apps)

**How e-Commerce is benefited**

As per a case study: Lancome rebuilt their website as PWA after seeing an increase in abandoned carts and loss in user traffic. After PWA result was:
+ Overall

	+ 84% decrease in time until the page is interactive
	+ 17% increase in conversions
	+ 15% decrease in bounce rate
	+ 51% increase in mobile sessions
+ iOS

	+ 53% increase in mobile sessions on iOS
	+ 10% decrease in bounce rates on iOS
+ Push

	+ 8% of consumers who tap on a push notification make a purchase
	+ 18% open rate from Push Notifications
	+ 12% increase in conversion rates on recovered carts via Push Notifications

The full case study at [Lancôme rebuilds their mobile website as a PWA](https://developers.google.com/web/showcase/2017/lancome)

### Prerequisite

- HTTPS-enabled website
- **Important** PWA icons see [Generating and adding PWA icons](https://vsanse.github.io/plugin_sg_pwa/#generating-and-adding-pwa-icons)

### Cartridge Download

1. Get the latest version from [Releases](https://github.com/vsanse/plugin_sg_pwa/releases)

2. :star: Star the repo :stuck_out_tongue_winking_eye:


### Steps to add PWA support
                
1. add "plugin_sg_pwa " cartridge to the site path

    Administration > Manage Sites > [Your Site ] > Settings > Cartridges
2. Create URL aliases for controllers:- Pwa-SW, Pwa-Manifest
    
    Merchant Tools >  SEO >  URL Rules > Pipeline URLs > New Alias
3. Include **pwa/register** template in head tag of your site e.g: htmlHead.isml
	```
	<isinclude template="pwa/register"/>
	```
4. Add new property file named pwa.properties to your site cartridge to update manifest.json file with your site name, theme, icons and To updated offline fallback page for your site.
5. **[Optional]** Add new template "pwa/static_assets.isml" if you want to override cache file on the first load and add pages to be cached in Service worker in form of an array: e.g:
	```
	[
        "${URLUtils.https("Pwa-Offline")}",<=== [MANDATORY TO ADD IN THIS FILE IF OVERRIDING]
        "${URLUtils.staticURL('/css/app.min.css')}",
        "${URLUtils.staticURL('/js/app.min.js')}"
    ]
    ```
6. **[Optional]** You may want to design your own offline page so create new template "pwa/offline.isml" in your site cartridge it will override default offline template in plugin cartridge.


### Generating and adding PWA icons
1. We will be generating our PWA icons using tool "pwa-asset-generator" so let's install it first
    ```
    npm install --global pwa-asset-generator
    ```
2. Now let's generate icons in the "icons" folder: for better experience make sure your logo file is png or svg.
    ```
     pwa-asset-generator [Your logo file] icons --opaque false
    ```
3. Now copy generated icons folder to "[Your site Cartridge]/static/default/images/"
4. **Updating pwa.properties file** :copy line [8-33] from "plugin_sg_pwa/templates/resources/pwa.properties", paste it to your site's pwa.properties file and replace "Sites-PWA-Site" to "Sites-[your site name]-Site".

### Features
1. #### Extend Manifest and Service worker
    Feeling adventurous? Want to add more cool functionalities to your PWA?

    + **To add more configurations to your manifest.json:**
        1. In your site cartridge's pwa.properties file add the line
            ```
            pwa.app.manifest.extended=true
            ```
        2. Create file **manifest_extended.isml** under **pwa** folder in templates of your site cartridge

    + **To add more functionalities to your service worker:**
        1. In your site cartridge's pwa.properties file add the line
            ```
            pwa.app.sw.extended=true
            ```
        2. Create file **sw_extended.isml** under **pwa** folder in templates of your site cartridge

    + **To override fetch method of service worker**
        1. In your site cartridge's pwa.properties file add the line
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
    Currently, you have a choice of 3 types of cache strategies.
    Cache Strategy can be defined using keywords  Cache First=CF, Network First=NF, Cache Then Network=CTN. For e.g.
    ```
    pwa.app.sw.cahe.strategy=CTN
    ```
    **Note** CTN is default and recommended cache strategy so you may not need to add this line to your site cartridge's pwa.properties file unless you want to override it.
    
    In CTN strategy every fetch request in service woker is first checked if it exists in cache if it does it will be served from there and if it doesn't then depending on your [opaque request handling](https://vsanse.github.io/plugin_sg_pwa/#handling-opaque-third-party-responses) it is served from network and cached at the same time. In case both of the above fails say request doesn't exists in cache and you are offline then it will fallback to generic error template defined by "Pwa-Offline" controller which you can override in your site cartridge for better UI/UX.
    
4. #### Handling opaque/ third party responses
    By default plugin prevent any third party request being cached and is recommended as every third party request may generate a response of type opaque which causes it to get a minimum 7MB storage space in the cache, more at [https://cloudfour.com/thinks/when-7-kb-equals-7-mb/](https://cloudfour.com/thinks/when-7-kb-equals-7-mb/)
    . Although it is recommended to not allow opaque response being cached you can allow it using 
    ```
        pwa.app.no.opaque.cache=false
    ```
    **Recommended way**:
    + Keep no opaque cache property as true in PWA.properties [default plugin behavior].
    + Opt-in to CORS mode: if your third-party CDNs all seem to support CORS, you could opt-in to CORS mode for your CSS and image requests via the [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-crossorigin) attribute, and the responses will no longer be opaque.
    + Add any third party request you want to cache to "static_assets.isml"
    + **Update:** Now you can whitelist your third party requests in service worker by adding them in the array "pwa.app.opaque.whitelist" in "pwa.properties" file.
        ```
            # If you need some opaque third party request to be cached you 
            # can either whitelist full domain by adding only origin say: "https://www.example.com" 
            # or you can whitelist only a specific request by using 
            # full url: "https://example.com/image/250x250" to the array

            pwa.app.opaque.whitelist=["https://www.example.com", "https://example.com/image/250x250"]
        ```
    
### Using with SFRA

Copy code from "controllers/Pwa-SFRA.txt" and replace code in Pwa.js under controllers folder in plugin

### Plugin at work:

**Click image to watch the video**

[![See on youtube](https://img.youtube.com/vi/XyNy90px5Lk/0.jpg)](https://www.youtube.com/watch?v=XyNy90px5Lk)


### For support and feedback:
Contact me at [LinkedIn](https://linkedin.com/in/vishal-sanserwal)
