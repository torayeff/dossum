CROP=function(){return function(){this.eles={ele:void 0,container:void 0,img:void 0,overlay:void 0,preview:void 0},this.img=void 0,this.imgInfo={aw:0,ah:0,w:0,h:0,at:0,al:0,t:0,l:0,s:1},this.init=function(t){function e(t){var e=t.val(),i=t.attr("min"),a=t.attr("max"),n=Math.round((e-i)/(a-i)*100),s="background: linear-gradient(to right, #fbc93d "+n+"%, #eee "+(n+.1)+"%);";t.attr("style",s)}$(t.container).attr({"data-imgcrop":"","data-mask":t.mask}).append('<div class="cropMain"></div>'),this.imgInfo.s=t.zoom.min;var i,a,n,s=$(t.container),o=s.find("input"),h=s.find(".cropMain"),r=t.preview,c=this;a=$("<div />").attr({"class":"crop-container"}).css({width:t.width+"px",height:t.height+"px"}),i=$("<img />").attr("class","crop-img").css({zIndex:5999,top:0,left:0}),n=$("<div />").attr({"class":"crop-overlay",draggable:"true"}).css({zIndex:6e3}),a.append(n),a.append(i),h.append(a),this.eles.ele=h,this.eles.container=a,this.eles.img=i,this.eles.overlay=n,this.eles.preview=r,this.loadImg(t.image),a.resize(function(){c.imgSize()}),n.bind(null!==document.ontouchstart?"mousedown":"touchstart",function(t){$("body").addClass("grabcursor");var e=$(this),i={x:t.originalEvent.pageX||t.originalEvent.touches[0].pageX,y:t.originalEvent.pageY||t.originalEvent.touches[0].pageY},a={x:e.parent().offset().left,y:e.parent().offset().top};return t.preventDefault(),$(document).bind(null!==document.ontouchmove?"mousemove":"touchmove",function(t){var n={x:t.originalEvent.pageX||t.originalEvent.changedTouches[0].pageX||i.x,y:t.originalEvent.pageY||t.originalEvent.changedTouches[0].pageY||i.y};i.y!==n.y&&(0===parseInt(e.css("top"))&&e.css({top:c.eles.ele.offset().top,left:c.eles.ele.offset().left}),c.imgMove({t:parseInt(e.css("top"))-(a.y-(i.y-n.y)),l:parseInt(e.css("left"))-(a.x-(i.x-n.x))}),e.css({left:a.x-(i.x-n.x),top:a.y-(i.y-n.y)}))}),$(document).bind(null!==document.ontouchend?"mouseup":"touchend",function(){$("body").removeClass("grabcursor"),$(document).unbind(null!==document.ontouchmove?"mousemove":"touchmove"),n.css({top:0,left:0})}),!1}),$("input[type=range]").on("input change",function(){c.slider(o.val()),e(o)}),c.zoom=function(t){if("min"===t||"max"===t)var t=parseInt(o.attr(t));c.slider(t),o.val(t),e(o)}},this.loadImg=function(t){var e=this;this.eles.img.removeAttr("style").attr("src",t).load(function(){e.imgSize()})},this.imgSize=function(){var t=this.eles.img,e={w:t.css("width","").width(),h:t.css("height","").height()},i=this.eles.container,a={wh:this.eles.container.width()/this.eles.container.height(),hw:this.eles.container.height()/this.eles.container.width()};this.imgInfo.aw=e.w,this.imgInfo.ah=e.h,e.w*a.hw<e.h*a.wh?(this.imgInfo.w=i.width(),this.imgInfo.h=this.imgInfo.w*(e.h/e.w),this.imgInfo.al=0):(this.imgInfo.h=i.height(),this.imgInfo.w=this.imgInfo.h*(e.w/e.h),this.imgInfo.at=0),this.imgResize()},this.imgResize=function(t){var e=this.eles.img,i=this.imgInfo,a=i.s;i.s=t||i.s,e.css({width:i.w*i.s,height:i.h*i.s}),this.imgMove({t:-(i.h*a-i.h*i.s)/2,l:-(i.w*a-i.w*i.s)/2})},this.imgMove=function(t){var e=this.eles.img,i=this.imgInfo,a=this.eles.container;i.t+=t.t,i.l+=t.l;var n=i.at-i.t,s=i.al-i.l;n>=0?n=i.t=0:n<-(i.h*i.s-a.height())&&(n=-(i.h*i.s-a.height()),i.t=0===i.at?i.h*i.s-a.height():i.h*i.s-a.height()),s>=0?s=i.l=0:s<-(i.w*i.s-a.width())&&(s=-(i.w*i.s-a.width()),i.l=0===i.al?i.w*i.s-a.width():i.w*i.s-a.width()),e.css({top:n,left:s}),this.eles.preview&&this.preview(this.eles.preview.width,this.eles.preview.height,this.eles.preview.container)},this.slider=function(t){this.imgResize(t)},this.data=function(t,e,i){var a=this,n=a.imgInfo,s=a.eles.container,o=a.eles.img,h=new Image;h.src=o.attr("src");var r=document.createElement("canvas");r.width=t,r.height=e;var c=Math.round((s.width()-0)*(n.aw/(n.w*n.s))),g=Math.round((s.height()-0)*(n.ah/(n.h*n.s))),l=Math.round(-(parseInt(o.css("left"))-0)*(n.aw/(n.w*n.s))),d=Math.round(-(parseInt(o.css("top"))-0)*(n.ah/(n.h*n.s)));return r.getContext("2d").drawImage(h,l,d,c,g,0,0,t,e),data={width:t,height:e,image:r.toDataURL("image/"+i),filetype:i}},this.preview=function(t,e,i){var a=this,n=(a.imgInfo,a.eles.container),s=a.eles.img;$(i+" img").length||$(i).css({height:n.height(),width:n.width(),overflow:"hidden",margin:"0 auto",padding:0,transform:"scale("+this.eles.preview.ratio+")"}).append("<img>"),$(i+" img").attr("src",s.attr("src")).attr("style","position:relative;"+$(".crop-img").attr("style"))},this.flip=function(){var t=this,e=(t.imgInfo,t.eles.container),i=t.eles.img,a=new Image;a.src=i.attr("src"),height=a.naturalHeight,width=a.naturalWidth,canvas=document.createElement("canvas"),canvas.width=width,canvas.height=height,canvas.getContext("2d").translate(width,0),canvas.getContext("2d").scale(-1,1),canvas.getContext("2d").drawImage(a,0,0),canvas.getContext("2d").translate(width,0),canvas.getContext("2d").scale(-1,1),e.find(".crop-img").removeAttr("style").attr("src",canvas.toDataURL())},this.rotate=function(){var t=this,e=(t.imgInfo,t.eles.container),i=t.eles.img,a=new Image;a.src=i.attr("src"),height=a.naturalHeight,width=a.naturalWidth,canvas=document.createElement("canvas"),canvas.width=height,canvas.height=width,canvas.getContext("2d").translate(canvas.width/2,canvas.height/2),canvas.getContext("2d").rotate(Math.PI/2),canvas.getContext("2d").drawImage(a,-width/2,-height/2),canvas.getContext("2d").rotate(-Math.PI/2),canvas.getContext("2d").translate(-canvas.width/2,-canvas.height/2),e.find(".crop-img").removeAttr("style").attr("src",canvas.toDataURL())},this.download=function(t,e,i,a,n){var s=this,o=s.imgInfo,h=s.eles.container,r=s.eles.img,c=new Image;c.src=r.attr("src");var g=document.createElement("canvas");g.width=t,g.height=e;var l=Math.round((h.width()-0)*(o.aw/(o.w*o.s))),d=Math.round((h.height()-0)*(o.ah/(o.h*o.s))),m=Math.round(-(parseInt(r.css("left"))-0)*(o.aw/(o.w*o.s))),v=Math.round(-(parseInt(r.css("top"))-0)*(o.ah/(o.h*o.s)));g.getContext("2d").drawImage(c,m,v,l,d,0,0,t,e),$("#"+n).attr("href",g.toDataURL("image/"+a)).attr("download",i+"."+a)},this.import=function(){$("body").append('<input type="file" id="importIMG" style="display:none">');{var t=this,e=(t.imgInfo,t.eles.container);t.eles.img}oFReader=new FileReader,rFilter=/^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i,$("#importIMG").change(function(){if(0!==document.getElementById("importIMG").files.length){var t=document.getElementById("importIMG").files[0];rFilter.test(t.type)&&(oFReader.readAsDataURL(t),$("#importIMG").remove())}}),oFReader.onload=function(t){e.find(".crop-img").removeAttr("style").attr("src",t.target.result)},$("#importIMG").click()}}}();