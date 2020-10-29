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
- **Important** PWA icons see [Generating and adding PWA icons](https://vsanse.github.io/plugin_sf_pwa/#generating-and-adding-pwa-icons)


### Cartridge Download

1. Get the latest version from [Releases](https://github.com/vsanse/plugin_sf_pwa/releases)

2. :star: Star the repo :stuck_out_tongue_winking_eye:


### Steps to add PWA support
                
1. add "plugin_sf_pwa " cartridge to the site path

    Administration > Manage Sites > [Your Site ] > Settings > Cartridges
2. Change `yourSiteId` folder name in meta folder to your site id name and import metadata
    
3. Include **pwa/register** template in head tag of your site e.g: htmlHead.isml
	```
	<isinclude template="pwa/register"/>
	```
4.  **[Optional]** Add new property file named pwa.properties to your site cartridge to update manifest.json file with your site name, theme, icons and To updated offline fallback page for your site.


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

### Features
1. #### Extend Manifest 
    Feeling adventurous? Want to add more cool functionalities to your PWA?

    + **To add more configurations to your manifest.json:**
        1. In your site cartridge's pwa.properties file add the line
            ```
            pwa.app.manifest.extended=true
            ```
        2. Create file **manifest_extended.isml** under **pwa** folder in templates of your site cartridge

2. #### Handling default app install behaviour
    From version [v1.3](https://github.com/vsanse/plugin_sf_pwa/releases) you can prevent default [mini-infobar](https://developers.google.com/web/fundamentals/app-install-banners#mini-info-bar) from appearing by using 
    ```
    pwa.app.preventadd2hs=true	
    ```
    If you decide to use above property, be sure to provide some [indication](https://vsanse.github.io/plugin_sf_pwa/#windowadd2hs-to-rescue) to the user that your Progressive Web App is installable.
	
3. #### window.add2hs to rescue
   From version [v1.3](https://github.com/vsanse/plugin_sf_pwa/releases) window object will have event add2hs which can be used to prompt user to install PWA using `window.add2hs.prompt()`. You can setup some [button or banner](https://developers.google.com/web/fundamentals/app-install-banners/promoting-install-mobile) to indicate user that your PWA is installable on click of which you can trigger `window.add2hs.prompt()` to prompt user to install PWA.

### For support and feedback:
Contact at Linkedin: 

[Vishal Sanserwal](https://linkedin.com/in/vishal-sanserwal)



