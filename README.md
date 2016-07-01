# Censor_Whatsapp_Images

This is a script to censor group's images in web.whatsapp.com

Censored images may be viewed by clicking on it, close the image-viewer to censor it back.

You may censor 1 or more persons' images in each group or all of them at once.

To use the script put it in TamperMonkey's scripts or run it in the console

Tested only in Chrome.

Configuration variables are at the top: (see code's comments)
	
	*groupMember: contains the groups and persons that you may want to censor.
		The code contains 2 group examples: 'groupName1' cesoring everyone and 'groupName2' censoring 2 members.
	
	censorImg: keep it false to blur images. Make it true to use the imageURL
	
	imageURL: replaces the image to be shown instead of the one the person sent.
	
	blurValue: if censorImg is false the blurValue defines how blurry the image will be.

*groupMember MUST be configured, the rest may be left with their default values.
