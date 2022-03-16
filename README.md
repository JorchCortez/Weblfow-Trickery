# Weblfow tips & tricks 💻
Created by [Jorge C.](https://github.com/JorchCortez)
Last updated by:
Last Updated: 16/03/2022

---
> this is just a small guide through what I've found while working with webflow, this fixes are not from webflow itself but from both the community and my self while trying to solve most problems so if it solves any of yours don't hesitate on staring this repo and if you feel there could be anything you can add to feel free to modify this file and send a PR to help with it 😃

Webflow is an amazing tool to create quick and easy web solutions including landing pages, blogs, ecommerce, etc. But every tool has its ups and downs and in this case even though it gives us some amazing features it is lacking some customization that may be required, here I got some usual scenarios where this happens and how to fix them.
---

## Select form fields
### Changing Select arrow 🔽
We've all struggled trying to get our select fields to look the way we want and some times something as simple as updating the arrow or just adding a slight padding to prevent it's default look can be a bit of a struggle, but here's a quick fix that can work not only on Webflow but also in any project you're working on.

this will allow you to eliminate the default arrow from the select field and add a new custom arrow of your liking which you can add a padding to and modify its size.

```
<style>
/*Change the arrow on the left of the select boxes*/
.select-field{
	/* reset arrow */
	-moz-appearance: none; /* for Firefox */
	-webkit-appearance: none; /* for Chrome */

	/* styling new arrow*/
	background-image: url(https://freepikpsd.com/file/2020/01/Down-Arrow-PNG-HD.png);
	background-position: right 16px bottom 50%;
	background-size: 12px;
	background-repeat: no-repeat;
}
</style>
```

### Adding CMS data into Select fields 🗄
While Sites like Webflow come with great solutions for most things with their integrated library CMS there are still some features it currently lacks, one of them being the ability of adding values to a Select form using CMS though this can be easily done by adding a little bit of flavor to the custom code section. follow the next steps to see it working:

1. Create your select in a form and remove all the options but the default (Though this is not really required I like having a "select an option" with null value option at the very top on my selects).
2. Add a CMS list, this can be added anywhere in the page, I prefer to place it in the same container as the select.
3. Add a text to the CMS List.
4. Set the text with your desired text coming from the list so it creates all of the options.
5. Add a class of "select-item" to the text *(you can use the class you want this is just to set it up as bellow)*
6. Add a class of "select-box" on your select item *(you can use the class you want this is just to set it up as bellow)*
7. Set your main collection list as hidden
8. Add the following code to the page:
```
<script>
$('.select-item').each(function(){
	var s = $(this).text();
  $('.select-box').append('<option value="'+ s +'">' + s +'</option>');
}); 
</script>
```
9. publish and see the magic.


Just to show the way the setup looks on webflow I'll show it here:<br/><br/>
![cms-select-layout-img](https://github.com/JorchCortez/Weblfow-tips---tricks/blob/main/imgs/cms-select-layout.png?raw=true)