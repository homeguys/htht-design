(this["webpackJsonphtht-design"]=this["webpackJsonphtht-design"]||[]).push([[9,8],{2007:function(e){e.exports=JSON.parse('{"main":{"value":"ChartBar","name":"\u67f1\u72b6\u56fe","detail":"\u67f1\u72b6\u56fe"},"demo":[{"title":"\u67f1\u72b6\u56fe","detail":"\u67f1\u72b6\u56fe"}]}')},2008:function(e,t,a){e.exports=a.p+"static/media/codes.e57e9522.md"},2009:function(e,t,a){var i=a(527),n=a(491),r=a(1041),o=r.layout,s=r.largeLayout;a(745),a(2010),a(2012),a(876),i.registerLayout(i.PRIORITY.VISUAL.LAYOUT,n.curry(o,"bar")),i.registerLayout(i.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT,s),i.registerVisual({seriesType:"bar",reset:function(e){e.getData().setVisual("legendSymbol","roundRect")}})},2010:function(e,t,a){var i=a(2011).extend({type:"series.bar",dependencies:["grid","polar"],brushSelector:"rect",getProgressive:function(){return!!this.get("large")&&this.get("progressive")},getProgressiveThreshold:function(){var e=this.get("progressiveThreshold"),t=this.get("largeThreshold");return t>e&&(e=t),e},defaultOption:{clip:!0,roundCap:!1}});e.exports=i},2011:function(e,t,a){var i=a(845),n=a(848),r=i.extend({type:"series.__base_bar__",getInitialData:function(e,t){return n(this.getSource(),this)},getMarkerPosition:function(e){var t=this.coordinateSystem;if(t){var a=t.dataToPoint(t.clampData(e)),i=this.getData(),n=i.getLayout("offset"),r=i.getLayout("size");return a[t.getBaseAxis().isHorizontal()?0:1]+=n+r/2,a}return[NaN,NaN]},defaultOption:{zlevel:0,z:2,coordinateSystem:"cartesian2d",legendHoverLink:!0,barMinHeight:0,barMinAngle:0,large:!1,largeThreshold:400,progressive:3e3,progressiveChunkMode:"mod",itemStyle:{},emphasis:{}}});e.exports=r},2012:function(e,t,a){a(545).__DEV__;var i=a(527),n=a(491),r=a(523),o=a(2013).setLabel,s=a(594),l=a(2014),c=a(554),d=a(738).throttle,u=a(875).createClipPath,h=a(2015),g=["itemStyle","barBorderWidth"],p=[0,0];n.extend(s.prototype,l);var f=i.extendChartView({type:"bar",render:function(e,t,a){this._updateDrawMode(e);var i=e.get("coordinateSystem");return"cartesian2d"!==i&&"polar"!==i||(this._isLargeDraw?this._renderLarge(e,t,a):this._renderNormal(e,t,a)),this.group},incrementalPrepareRender:function(e,t,a){this._clear(),this._updateDrawMode(e)},incrementalRender:function(e,t,a,i){this._incrementalRenderLarge(e,t)},_updateDrawMode:function(e){var t=e.pipelineContext.large;(null==this._isLargeDraw||t^this._isLargeDraw)&&(this._isLargeDraw=t,this._clear())},_renderNormal:function(e,t,a){var i,n=this.group,o=e.getData(),s=this._data,l=e.coordinateSystem,c=l.getBaseAxis();"cartesian2d"===l.type?i=c.isHorizontal():"polar"===l.type&&(i="angle"===c.dim);var d=e.isAnimationEnabled()?e:null,u=e.get("clip",!0),h=function(e,t){var a=e.getArea&&e.getArea();if("cartesian2d"===e.type){var i=e.getBaseAxis();if("category"!==i.type||!i.onBand){var n=t.getLayout("bandWidth");i.isHorizontal()?(a.x-=n,a.width+=2*n):(a.y-=n,a.height+=2*n)}}return a}(l,o);n.removeClipPath();var g=e.get("roundCap",!0);o.diff(s).add((function(t){if(o.hasValue(t)){var a=o.getItemModel(t),r=_[l.type](o,t,a);if(u)if(y[l.type](h,r))return void n.remove(s);var s=v[l.type](t,r,i,d,!1,g);o.setItemGraphicEl(t,s),n.add(s),w(s,o,t,a,r,e,i,"polar"===l.type)}})).update((function(t,a){var c=s.getItemGraphicEl(a);if(o.hasValue(t)){var p=o.getItemModel(t),f=_[l.type](o,t,p);if(u)if(y[l.type](h,f))return void n.remove(c);c?r.updateProps(c,{shape:f},d,t):c=v[l.type](t,f,i,d,!0,g),o.setItemGraphicEl(t,c),n.add(c),w(c,o,t,p,f,e,i,"polar"===l.type)}else n.remove(c)})).remove((function(e){var t=s.getItemGraphicEl(e);"cartesian2d"===l.type?t&&A(e,d,t):t&&b(e,d,t)})).execute(),this._data=o},_renderLarge:function(e,t,a){this._clear(),C(e,this.group);var i=e.get("clip",!0)?u(e.coordinateSystem,!1,e):null;i?this.group.setClipPath(i):this.group.removeClipPath()},_incrementalRenderLarge:function(e,t){C(t,this.group,!0)},dispose:n.noop,remove:function(e){this._clear(e)},_clear:function(e){var t=this.group,a=this._data;e&&e.get("animation")&&a&&!this._isLargeDraw?a.eachItemGraphicEl((function(t){"sector"===t.type?b(t.dataIndex,e,t):A(t.dataIndex,e,t)})):t.removeAll(),this._data=null}}),x=Math.max,m=Math.min,y={cartesian2d:function(e,t){var a=t.width<0?-1:1,i=t.height<0?-1:1;a<0&&(t.x+=t.width,t.width=-t.width),i<0&&(t.y+=t.height,t.height=-t.height);var n=x(t.x,e.x),r=m(t.x+t.width,e.x+e.width),o=x(t.y,e.y),s=m(t.y+t.height,e.y+e.height);t.x=n,t.y=o,t.width=r-n,t.height=s-o;var l=t.width<0||t.height<0;return a<0&&(t.x+=t.width,t.width=-t.width),i<0&&(t.y+=t.height,t.height=-t.height),l},polar:function(e){return!1}},v={cartesian2d:function(e,t,a,i,o){var s=new r.Rect({shape:n.extend({},t)});if(i){var l=a?"height":"width",c={};s.shape[l]=0,c[l]=t[l],r[o?"updateProps":"initProps"](s,{shape:c},i,e)}return s},polar:function(e,t,a,i,o,s){var l=t.startAngle<t.endAngle,c=new(!a&&s?h:r.Sector)({shape:n.defaults({clockwise:l},t)});if(i){var d=a?"r":"endAngle",u={};c.shape[d]=a?0:t.startAngle,u[d]=t[d],r[o?"updateProps":"initProps"](c,{shape:u},i,e)}return c}};function A(e,t,a){a.style.text=null,r.updateProps(a,{shape:{width:0}},t,e,(function(){a.parent&&a.parent.remove(a)}))}function b(e,t,a){a.style.text=null,r.updateProps(a,{shape:{r:a.shape.r0}},t,e,(function(){a.parent&&a.parent.remove(a)}))}var _={cartesian2d:function(e,t,a){var i=e.getItemLayout(t),n=function(e,t){var a=e.get(g)||0;return Math.min(a,Math.abs(t.width),Math.abs(t.height))}(a,i),r=i.width>0?1:-1,o=i.height>0?1:-1;return{x:i.x+r*n/2,y:i.y+o*n/2,width:i.width-r*n,height:i.height-o*n}},polar:function(e,t,a){var i=e.getItemLayout(t);return{cx:i.cx,cy:i.cy,r0:i.r0,r:i.r,startAngle:i.startAngle,endAngle:i.endAngle}}};function w(e,t,a,i,s,l,c,d){var u=t.getItemVisual(a,"color"),h=t.getItemVisual(a,"opacity"),g=i.getModel("itemStyle"),p=i.getModel("emphasis.itemStyle").getBarItemStyle();d||e.setShape("r",g.get("barBorderRadius")||0),e.useStyle(n.defaults({fill:u,opacity:h},g.getBarItemStyle()));var f=i.getShallow("cursor");f&&e.attr("cursor",f);var x=c?s.height>0?"bottom":"top":s.width>0?"left":"right";d||o(e.style,p,i,u,l,a,x),r.setHoverStyle(e,p)}var L=c.extend({type:"largeBar",shape:{points:[]},buildPath:function(e,t){for(var a=t.points,i=this.__startPoint,n=this.__baseDimIdx,r=0;r<a.length;r+=2)i[n]=a[r+n],e.moveTo(i[0],i[1]),e.lineTo(a[r],a[r+1])}});function C(e,t,a){var i=e.getData(),n=[],r=i.getLayout("valueAxisHorizontal")?1:0;n[1-r]=i.getLayout("valueAxisStart");var o=new L({shape:{points:i.getLayout("largePoints")},incremental:!!a,__startPoint:n,__baseDimIdx:r,__largeDataIndices:i.getLayout("largeDataIndices"),__barWidth:i.getLayout("barWidth")});t.add(o),function(e,t,a){var i=a.getVisual("borderColor")||a.getVisual("color"),n=t.getModel("itemStyle").getItemStyle(["color","borderColor"]);e.useStyle(n),e.style.fill=null,e.style.stroke=i,e.style.lineWidth=a.getLayout("barWidth")}(o,e,i),o.seriesIndex=e.seriesIndex,e.get("silent")||(o.on("mousedown",S),o.on("mousemove",S))}var S=d((function(e){var t=function(e,t,a){var i=e.__baseDimIdx,n=1-i,r=e.shape.points,o=e.__largeDataIndices,s=Math.abs(e.__barWidth/2),l=e.__startPoint[n];p[0]=t,p[1]=a;for(var c=p[i],d=p[1-i],u=c-s,h=c+s,g=0,f=r.length/2;g<f;g++){var x=2*g,m=r[x+i],y=r[x+n];if(m>=u&&m<=h&&(l<=y?d>=l&&d<=y:d>=y&&d<=l))return o[g]}return-1}(this,e.offsetX,e.offsetY);this.dataIndex=t>=0?t:null}),30,!1);e.exports=f},2013:function(e,t,a){var i=a(523),n=a(874).getDefaultLabel;function r(e,t){"outside"===e.textPosition&&(e.textPosition=t)}t.setLabel=function(e,t,a,o,s,l,c){var d=a.getModel("label"),u=a.getModel("emphasis.label");i.setLabelStyle(e,t,d,u,{labelFetcher:s,labelDataIndex:l,defaultText:n(s.getData(),l),isRectText:!0,autoColor:o}),r(e),r(t)}},2014:function(e,t,a){var i=a(732)([["fill","color"],["stroke","borderColor"],["lineWidth","borderWidth"],["stroke","barBorderColor"],["lineWidth","barBorderWidth"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"]]),n={getBarItemStyle:function(e){var t=i(this,e);if(this.getBorderLineDash){var a=this.getBorderLineDash();a&&(t.lineDash=a)}return t}};e.exports=n},2015:function(e,t,a){var i=(0,a(523).extendShape)({type:"sausage",shape:{cx:0,cy:0,r0:0,r:0,startAngle:0,endAngle:2*Math.PI,clockwise:!0},buildPath:function(e,t){var a=t.cx,i=t.cy,n=Math.max(t.r0||0,0),r=Math.max(t.r,0),o=.5*(r-n),s=n+o,l=t.startAngle,c=t.endAngle,d=t.clockwise,u=Math.cos(l),h=Math.sin(l),g=Math.cos(c),p=Math.sin(c);(d?c-l<2*Math.PI:l-c<2*Math.PI)&&(e.moveTo(u*n+a,h*n+i),e.arc(u*s+a,h*s+i,o,-Math.PI+l,l,!d)),e.arc(a,i,r,l,c,!d),e.moveTo(g*r+a,p*r+i),e.arc(g*s+a,p*s+i,o,c-2*Math.PI,c-Math.PI,!d),0!==n&&(e.arc(a,i,n,c,l,d),e.moveTo(u*n+a,p*n+i)),e.closePath()}});e.exports=i},2222:function(e,t,a){"use strict";a.r(t);var i=a(233),n=a.n(i),r=a(234),o=a.n(r),s=a(235),l=a.n(s),c=a(236),d=a.n(c),u=a(237),h=a.n(u),g=a(2),p=a.n(g),f=a(499),x=a.n(f),m=a(498),y=a(2007),v=a(2008),A=a.n(v),b=a(527),_=a.n(b),w=(a(2009),a(742),a(744),a(160)),L=function(e){function t(e){var a;return n()(this,t),(a=l()(this,d()(t).call(this,e))).state={},a.hash=Object(w.b)(6),a.option={backgroundColor:"#2c343c",tooltip:{trigger:"item"},grid:{left:"7%",bottom:"0%",top:"8%",right:"5%",containLabel:!0},xAxis:{axisLabel:{textStyle:{color:"#FFF"},rotate:30},axisTick:{show:!1},axisLine:{show:!0,lineStyle:{color:"#454A5C"}}},yAxis:{axisLine:{show:!0,lineStyle:{color:"#454A5C"}},axisTick:{show:!1},splitLine:{show:!1},axisLabel:{textStyle:{color:"#FFF"}}},series:[{type:"bar",barWidth:30,itemStyle:{normal:{color:new _.a.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#83bff6"},{offset:.5,color:"#188df0"},{offset:1,color:"#188df0"}])},emphasis:{color:new _.a.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#2378f7"},{offset:.7,color:"#2378f7"},{offset:1,color:"#83bff6"}])}}}]},a}return h()(t,e),o()(t,[{key:"componentDidUpdate",value:function(){var e=this.props,t=e.dataSource,a=e.option,i=_.a.init(document.getElementById("htht-chart-bar-".concat(this.hash))),n=Object(w.d)(this.option,a);n.xAxis.data=t.xAxisData,n.series[0].data=t.seriesData,i.setOption(n),this.screenChange()}},{key:"screenChange",value:function(){var e=this;window.addEventListener("resize",(function(){e.chartPie.resize()}))}},{key:"render",value:function(){return p.a.createElement("div",{className:"htht-chart-bar",id:"htht-chart-bar-".concat(this.hash)})}}]),t}(p.a.Component),C={xAxisData:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],seriesData:[120,200,150,80,70,110,130]};var S=[function(){return p.a.createElement("div",{className:"basic-pie-demo"},p.a.createElement(L,{dataSource:C}))}];a.d(t,"default",(function(){return M}));var M=function(e){function t(e){var a;return n()(this,t),(a=l()(this,d()(t).call(this,e))).state={codes:""},a}return h()(t,e),o()(t,[{key:"componentDidMount",value:function(){var e=this;x.a.get(A.a).then((function(t){var a=t.data.split("---").filter(Boolean);a=a.map((function(e){return e.replace(/```jsx/,"").replace(/```/,"").trim()})),e.setState({codes:a})}))}},{key:"render",value:function(){var e=this.state.codes,t=y.main,a=y.demo,i=Object(w.g)(S,e,a);return p.a.createElement(m.a,{data:i,mainDesc:t})}}]),t}(p.a.Component)},492:function(e,t,a){"use strict";var i=a(2),n=a.n(i),r=a(240).a.hthtPrefix;t.a=function(e){var t=e.children;return n.a.createElement("div",{id:"".concat(r,"-main-content")},n.a.createElement("div",{className:"content-wrapper"},t))}},494:function(e,t,a){"use strict";var i=a(233),n=a.n(i),r=a(234),o=a.n(r),s=a(235),l=a.n(s),c=a(236),d=a.n(c),u=a(367),h=a.n(u),g=a(237),p=a.n(g),f=a(493),x=a.n(f),m=a(2),y=a.n(m),v=a(501),A=a.n(v),b=function(e){function t(e){var a;return n()(this,t),a=l()(this,d()(t).call(this,e)),x()(h()(a),"highlightCode",(function(){for(var e=a.el.querySelectorAll("pre code"),t=0;t<e.length;t++)A.a.highlightBlock(e[t])})),a.setEl=a.setEl.bind(h()(a)),a}return p()(t,e),o()(t,[{key:"componentDidMount",value:function(){this.highlightCode()}},{key:"componentDidUpdate",value:function(){this.highlightCode()}},{key:"setEl",value:function(e){this.el=e}},{key:"render",value:function(){var e=this.props,t=e.children,a=e.className,i=e.element,n=e.innerHTML,r={ref:this.setEl,className:a};return n?(r.dangerouslySetInnerHTML={__html:t},i?y.a.createElement(i,r):y.a.createElement("div",r)):i?y.a.createElement(i,r,t):y.a.createElement("pre",{ref:this.setEl},y.a.createElement("code",{className:a},t))}}]),t}(y.a.Component);b.defaultProps={innerHTML:!1,className:null,element:null},t.a=b},498:function(e,t,a){"use strict";a(503);var i=a(504),n=a.n(i),r=(a(369),a(159)),o=a.n(r),s=a(2),l=a.n(s),c=a(494),d=a(492),u=(a(515),a(516)),h=a.n(u),g=a(521),p=a.n(g),f=a(522),x=a.n(f),m=a(160);var y=function(e){var t=Object(s.useState)("\u590d\u5236\u4ee3\u7801"),a=p()(t,2),i=a[0],n=a[1],r=Object(s.useState)("icon-copy"),o=p()(r,2),c=o[0],d=o[1],u=e.item,g=u.desc;g||(g={title:"",detail:""});var f=g.title,y=g.detail;return l.a.createElement("section",{className:"code-box-meta"},l.a.createElement("div",{className:"code-box-title"},l.a.createElement("b",null,f)),l.a.createElement("div",{className:"code-box-description"},l.a.createElement("div",null,l.a.createElement("p",null,y))),l.a.createElement("div",{className:"code-box-actions"},l.a.createElement(x.a,{"data-clipboard-text":u.code,onSuccess:function(){n("\u590d\u5236\u6210\u529f"),d("icon-done")}},l.a.createElement(h.a,{title:i},l.a.createElement("i",{className:c,onMouseLeave:function(){n("\u590d\u5236\u4ee3\u7801"),d("icon-copy")}}))),l.a.createElement(h.a,{title:"\u5c55\u5f00\u4ee3\u7801"},l.a.createElement("i",{className:"icon-expend",onClick:function(e){Object(m.f)(e.target,".code-box").classList.toggle("expend"),window.getSelection?window.getSelection().removeAllRanges():document.selection.empty()}}))))},v=(a(518),a(519)),A=a.n(v),b=(a(512),a(513)),_=a.n(b),w=a(233),L=a.n(w),C=a(234),S=a.n(C),M=a(235),E=a.n(M),I=a(236),D=a.n(I),P=a(237),T=a.n(P),k=function(e){function t(e){var a;return L()(this,t),(a=E()(this,D()(t).call(this,e))).columns=[{title:"\u53c2\u6570",dataIndex:"param",key:"param",render:function(e){var t="API"===e||"FormKey"===e?"title":"";return l.a.createElement("span",{className:t},e)}},{title:"\u8bf4\u660e",dataIndex:"explain",key:"explain"},{title:"\u7c7b\u578b",key:"type",dataIndex:"type",render:function(e){return l.a.createElement("span",null,Array.isArray(e)&&e.map((function(e,t){var a;switch(t){case 0:a="#2db7f5";break;case 1:a="#f50";break;case 2:a="#87d068";break;default:a="#2db7f5"}return l.a.createElement(_.a,{color:a,key:t},e)})))}},{title:"\u9ed8\u8ba4\u503c",dataIndex:"default",key:"default"}],a}return T()(t,e),S()(t,[{key:"render",value:function(){var e=this.props.dataSource;return l.a.createElement("div",{className:"api-container"},l.a.createElement(A.a,{columns:this.columns,dataSource:e,pagination:!1}))}}]),t}(l.a.Component);a(500);t.a=function(e){var t=e.mainDesc,a=e.data,i=e.apiData;return l.a.createElement(d.a,null,l.a.createElement("article",null,l.a.createElement("section",{className:"content-title"},l.a.createElement("h1",null,t.value,l.a.createElement("span",null,t.name)),l.a.createElement("p",{className:"main-desc"},t.detail),l.a.createElement("h2",null,"\u4ee3\u7801\u6f14\u793a",l.a.createElement(o.a,{type:"appstore"}))),l.a.createElement("div",{className:"code-box-wrapper"},a.map((function(e,t){return l.a.createElement("section",{className:"code-box",key:t},l.a.createElement("section",{className:"code-box-demo"},l.a.createElement(e.component,null)),l.a.createElement(y,{item:e}),l.a.createElement("section",{className:"highlight-wrapper"},l.a.createElement("div",{className:"highlight"},l.a.createElement(c.a,{className:"javascript,js,jsx"},e.code))))}))),l.a.createElement(k,{dataSource:i})),l.a.createElement(n.a,{target:function(){return document.getElementById("htht-main-content")}}))}},500:function(e,t,a){},694:function(e,t,a){var i=a(491),n=a(580),r=a(872),o=a(852),s=n.extend({type:"cartesian2dAxis",axis:null,init:function(){s.superApply(this,"init",arguments),this.resetRange()},mergeOption:function(){s.superApply(this,"mergeOption",arguments),this.resetRange()},restoreData:function(){s.superApply(this,"restoreData",arguments),this.resetRange()},getCoordSysModel:function(){return this.ecModel.queryComponents({mainType:"grid",index:this.option.gridIndex,id:this.option.gridId})[0]}});function l(e,t){return t.type||(t.data?"category":"value")}i.merge(s.prototype,o);var c={offset:0};r("x",s,l,c),r("y",s,l,c);var d=s;e.exports=d},745:function(e,t,a){a(545).__DEV__;var i=a(491),n=i.isObject,r=i.each,o=i.map,s=i.indexOf,l=(i.retrieve,a(595).getLayoutRect),c=a(625),d=c.createScaleByModel,u=c.ifAxisCrossZero,h=c.niceScaleExtent,g=c.estimateLabelUnionRect,p=a(868),f=a(870),x=a(736),m=a(624).getStackedDimension;function y(e,t,a){return e.getCoordSysModel()===t}function v(e,t,a){this._coordsMap={},this._coordsList=[],this._axesMap={},this._axesList=[],this._initCartesian(e,t,a),this.model=e}a(871);var A=v.prototype;function b(e,t,a,i){a.getAxesOnZeroOf=function(){return n?[n]:[]};var n,r=e[t],o=a.model,s=o.get("axisLine.onZero"),l=o.get("axisLine.onZeroAxisIndex");if(s){if(null!=l)_(r[l])&&(n=r[l]);else for(var c in r)if(r.hasOwnProperty(c)&&_(r[c])&&!i[d(r[c])]){n=r[c];break}n&&(i[d(n)]=!0)}function d(e){return e.dim+"_"+e.index}}function _(e){return e&&"category"!==e.type&&"time"!==e.type&&u(e)}A.type="grid",A.axisPointerEnabled=!0,A.getRect=function(){return this._rect},A.update=function(e,t){var a=this._axesMap;this._updateScale(e,this.model),r(a.x,(function(e){h(e.scale,e.model)})),r(a.y,(function(e){h(e.scale,e.model)}));var i={};r(a.x,(function(e){b(a,"y",e,i)})),r(a.y,(function(e){b(a,"x",e,i)})),this.resize(this.model,t)},A.resize=function(e,t,a){var i=l(e.getBoxLayoutParams(),{width:t.getWidth(),height:t.getHeight()});this._rect=i;var n=this._axesList;function o(){r(n,(function(e){var t=e.isHorizontal(),a=t?[0,i.width]:[0,i.height],n=e.inverse?1:0;e.setExtent(a[n],a[1-n]),function(e,t){var a=e.getExtent(),i=a[0]+a[1];e.toGlobalCoord="x"===e.dim?function(e){return e+t}:function(e){return i-e+t},e.toLocalCoord="x"===e.dim?function(e){return e-t}:function(e){return i-e+t}}(e,t?i.x:i.y)}))}o(),!a&&e.get("containLabel")&&(r(n,(function(e){if(!e.model.get("axisLabel.inside")){var t=g(e);if(t){var a=e.isHorizontal()?"height":"width",n=e.model.get("axisLabel.margin");i[a]-=t[a]+n,"top"===e.position?i.y+=t.height+n:"left"===e.position&&(i.x+=t.width+n)}}})),o())},A.getAxis=function(e,t){var a=this._axesMap[e];if(null!=a){if(null==t)for(var i in a)if(a.hasOwnProperty(i))return a[i];return a[t]}},A.getAxes=function(){return this._axesList.slice()},A.getCartesian=function(e,t){if(null!=e&&null!=t){var a="x"+e+"y"+t;return this._coordsMap[a]}n(e)&&(t=e.yAxisIndex,e=e.xAxisIndex);for(var i=0,r=this._coordsList;i<r.length;i++)if(r[i].getAxis("x").index===e||r[i].getAxis("y").index===t)return r[i]},A.getCartesians=function(){return this._coordsList.slice()},A.convertToPixel=function(e,t,a){var i=this._findConvertTarget(e,t);return i.cartesian?i.cartesian.dataToPoint(a):i.axis?i.axis.toGlobalCoord(i.axis.dataToCoord(a)):null},A.convertFromPixel=function(e,t,a){var i=this._findConvertTarget(e,t);return i.cartesian?i.cartesian.pointToData(a):i.axis?i.axis.coordToData(i.axis.toLocalCoord(a)):null},A._findConvertTarget=function(e,t){var a,i,n=t.seriesModel,r=t.xAxisModel||n&&n.getReferringComponents("xAxis")[0],o=t.yAxisModel||n&&n.getReferringComponents("yAxis")[0],l=t.gridModel,c=this._coordsList;if(n)a=n.coordinateSystem,s(c,a)<0&&(a=null);else if(r&&o)a=this.getCartesian(r.componentIndex,o.componentIndex);else if(r)i=this.getAxis("x",r.componentIndex);else if(o)i=this.getAxis("y",o.componentIndex);else if(l){l.coordinateSystem===this&&(a=this._coordsList[0])}return{cartesian:a,axis:i}},A.containPoint=function(e){var t=this._coordsList[0];if(t)return t.containPoint(e)},A._initCartesian=function(e,t,a){var i={left:!1,right:!1,top:!1,bottom:!1},n={x:{},y:{}},o={x:0,y:0};if(t.eachComponent("xAxis",s("x"),this),t.eachComponent("yAxis",s("y"),this),!o.x||!o.y)return this._axesMap={},void(this._axesList=[]);function s(t){return function(a,r){if(y(a,e)){var s=a.get("position");"x"===t?"top"!==s&&"bottom"!==s&&(s=i.bottom?"top":"bottom"):"left"!==s&&"right"!==s&&(s=i.left?"right":"left"),i[s]=!0;var l=new f(t,d(a),[0,0],a.get("type"),s),c="category"===l.type;l.onBand=c&&a.get("boundaryGap"),l.inverse=a.get("inverse"),a.axis=l,l.model=a,l.grid=this,l.index=r,this._axesList.push(l),n[t][r]=l,o[t]++}}}this._axesMap=n,r(n.x,(function(t,a){r(n.y,(function(i,n){var r="x"+a+"y"+n,o=new p(r);o.grid=this,o.model=e,this._coordsMap[r]=o,this._coordsList.push(o),o.addAxis(t),o.addAxis(i)}),this)}),this)},A._updateScale=function(e,t){function a(e,t,a){r(e.mapDimension(t.dim,!0),(function(a){t.scale.unionExtentFromData(e,m(e,a))}))}r(this._axesList,(function(e){e.scale.setExtent(1/0,-1/0)})),e.eachSeries((function(i){if(C(i)){var n=L(i,e),r=n[0],o=n[1];if(!y(r,t)||!y(o,t))return;var s=this.getCartesian(r.componentIndex,o.componentIndex),l=i.getData(),c=s.getAxis("x"),d=s.getAxis("y");"list"===l.type&&(a(l,c,i),a(l,d,i))}}),this)},A.getTooltipAxes=function(e){var t=[],a=[];return r(this.getCartesians(),(function(i){var n=null!=e&&"auto"!==e?i.getAxis(e):i.getBaseAxis(),r=i.getOtherAxis(n);s(t,n)<0&&t.push(n),s(a,r)<0&&a.push(r)})),{baseAxes:t,otherAxes:a}};var w=["xAxis","yAxis"];function L(e,t){return o(w,(function(t){return e.getReferringComponents(t)[0]}))}function C(e){return"cartesian2d"===e.get("coordinateSystem")}v.create=function(e,t){var a=[];return e.eachComponent("grid",(function(i,n){var r=new v(i,e,t);r.name="grid_"+n,r.resize(i,t,!0),i.coordinateSystem=r,a.push(r)})),e.eachSeries((function(e){if(C(e)){var t=L(e),a=t[0],i=t[1],n=a.getCoordSysModel().coordinateSystem;e.coordinateSystem=n.getCartesian(a.componentIndex,i.componentIndex)}})),a},v.dimensions=v.prototype.dimensions=p.prototype.dimensions,x.register("cartesian2d",v);var S=v;e.exports=S},868:function(e,t,a){var i=a(491),n=a(566),r=a(869);function o(e){r.call(this,e)}o.prototype={constructor:o,type:"cartesian2d",dimensions:["x","y"],getBaseAxis:function(){return this.getAxesByScale("ordinal")[0]||this.getAxesByScale("time")[0]||this.getAxis("x")},containPoint:function(e){var t=this.getAxis("x"),a=this.getAxis("y");return t.contain(t.toLocalCoord(e[0]))&&a.contain(a.toLocalCoord(e[1]))},containData:function(e){return this.getAxis("x").containData(e[0])&&this.getAxis("y").containData(e[1])},dataToPoint:function(e,t,a){var i=this.getAxis("x"),n=this.getAxis("y");return(a=a||[])[0]=i.toGlobalCoord(i.dataToCoord(e[0])),a[1]=n.toGlobalCoord(n.dataToCoord(e[1])),a},clampData:function(e,t){var a=this.getAxis("x").scale,i=this.getAxis("y").scale,n=a.getExtent(),r=i.getExtent(),o=a.parse(e[0]),s=i.parse(e[1]);return(t=t||[])[0]=Math.min(Math.max(Math.min(n[0],n[1]),o),Math.max(n[0],n[1])),t[1]=Math.min(Math.max(Math.min(r[0],r[1]),s),Math.max(r[0],r[1])),t},pointToData:function(e,t){var a=this.getAxis("x"),i=this.getAxis("y");return(t=t||[])[0]=a.coordToData(a.toLocalCoord(e[0])),t[1]=i.coordToData(i.toLocalCoord(e[1])),t},getOtherAxis:function(e){return this.getAxis("x"===e.dim?"y":"x")},getArea:function(){var e=this.getAxis("x").getGlobalExtent(),t=this.getAxis("y").getGlobalExtent(),a=Math.min(e[0],e[1]),i=Math.min(t[0],t[1]),r=Math.max(e[0],e[1])-a,o=Math.max(t[0],t[1])-i;return new n(a,i,r,o)}},i.inherits(o,r);var s=o;e.exports=s},869:function(e,t,a){var i=a(491);function n(e){return this._axes[e]}var r=function(e){this._axes={},this._dimList=[],this.name=e||""};r.prototype={constructor:r,type:"cartesian",getAxis:function(e){return this._axes[e]},getAxes:function(){return i.map(this._dimList,n,this)},getAxesByScale:function(e){return e=e.toLowerCase(),i.filter(this.getAxes(),(function(t){return t.scale.type===e}))},addAxis:function(e){var t=e.dim;this._axes[t]=e,this._dimList.push(t)},dataToCoord:function(e){return this._dataCoordConvert(e,"dataToCoord")},coordToData:function(e){return this._dataCoordConvert(e,"coordToData")},_dataCoordConvert:function(e,t){for(var a=this._dimList,i=e instanceof Array?[]:{},n=0;n<a.length;n++){var r=a[n],o=this._axes[r];i[r]=o[t](e[r])}return i}};var o=r;e.exports=o},870:function(e,t,a){var i=a(491),n=a(854),r=function(e,t,a,i,r){n.call(this,e,t,a),this.type=i||"value",this.position=r||"bottom"};r.prototype={constructor:r,index:0,getAxesOnZeroOf:null,model:null,isHorizontal:function(){var e=this.position;return"top"===e||"bottom"===e},getGlobalExtent:function(e){var t=this.getExtent();return t[0]=this.toGlobalCoord(t[0]),t[1]=this.toGlobalCoord(t[1]),e&&t[0]>t[1]&&t.reverse(),t},getOtherAxis:function(){this.grid.getOtherAxis()},pointToData:function(e,t){return this.coordToData(this.toLocalCoord(e["x"===this.dim?0:1]),t)},toLocalCoord:null,toGlobalCoord:null},i.inherits(r,n);var o=r;e.exports=o},871:function(e,t,a){a(694);var i=a(580).extend({type:"grid",dependencies:["xAxis","yAxis"],layoutMode:"box",coordinateSystem:null,defaultOption:{show:!1,zlevel:0,z:0,left:"10%",top:60,right:"10%",bottom:60,containLabel:!1,backgroundColor:"rgba(0,0,0,0)",borderWidth:1,borderColor:"#ccc"}});e.exports=i},872:function(e,t,a){var i=a(491),n=a(873),r=a(580),o=a(595),s=o.getLayoutParams,l=o.mergeLayoutParam,c=a(850),d=["value","category","time","log"];e.exports=function(e,t,a,o){i.each(d,(function(r){t.extend({type:e+"Axis."+r,mergeDefaultAndTheme:function(t,n){var o=this.layoutMode,c=o?s(t):{},d=n.getTheme();i.merge(t,d.get(r+"Axis")),i.merge(t,this.getDefaultOption()),t.type=a(e,t),o&&l(t,c,o)},optionUpdated:function(){"category"===this.option.type&&(this.__ordinalMeta=c.createByAxisModel(this))},getCategories:function(e){var t=this.option;if("category"===t.type)return e?t.data:this.__ordinalMeta.categories},getOrdinalMeta:function(){return this.__ordinalMeta},defaultOption:i.mergeAll([{},n[r+"Axis"],o],!0)})})),r.registerSubTypeDefaulter(e+"Axis",i.curry(a,e))}},873:function(e,t,a){var i=a(491),n={show:!0,zlevel:0,z:0,inverse:!1,name:"",nameLocation:"end",nameRotate:null,nameTruncate:{maxWidth:null,ellipsis:"...",placeholder:"."},nameTextStyle:{},nameGap:15,silent:!1,triggerEvent:!1,tooltip:{show:!1},axisPointer:{},axisLine:{show:!0,onZero:!0,onZeroAxisIndex:null,lineStyle:{color:"#333",width:1,type:"solid"},symbol:["none","none"],symbolSize:[10,15]},axisTick:{show:!0,inside:!1,length:5,lineStyle:{width:1}},axisLabel:{show:!0,inside:!1,rotate:0,showMinLabel:null,showMaxLabel:null,margin:8,fontSize:12},splitLine:{show:!0,lineStyle:{color:["#ccc"],width:1,type:"solid"}},splitArea:{show:!1,areaStyle:{color:["rgba(250,250,250,0.3)","rgba(200,200,200,0.3)"]}}},r={};r.categoryAxis=i.merge({boundaryGap:!0,deduplication:null,splitLine:{show:!1},axisTick:{alignWithLabel:!1,interval:"auto"},axisLabel:{interval:"auto"}},n),r.valueAxis=i.merge({boundaryGap:[0,0],splitNumber:5},n),r.timeAxis=i.defaults({scale:!0,min:"dataMin",max:"dataMax"},r.valueAxis),r.logAxis=i.defaults({scale:!0,logBase:10},r.valueAxis);var o=r;e.exports=o},874:function(e,t,a){var i=a(611).retrieveRawValue;t.getDefaultLabel=function(e,t){var a=e.mapDimension("defaultedLabel",!0),n=a.length;if(1===n)return i(e,t,a[0]);if(n){for(var r=[],o=0;o<a.length;o++){var s=i(e,t,a[o]);r.push(s)}return r.join(" ")}}},875:function(e,t,a){var i=a(523),n=a(540).round;function r(e,t,a){var n=e.getArea(),r=e.getBaseAxis().isHorizontal(),o=n.x,s=n.y,l=n.width,c=n.height,d=a.get("lineStyle.width")||2;o-=d/2,s-=d/2,l+=d,c+=d;var u=new i.Rect({shape:{x:o,y:s,width:l,height:c}});return t&&(u.shape[r?"width":"height"]=0,i.initProps(u,{shape:{width:l,height:c}},a)),u}function o(e,t,a){var r=e.getArea(),o=new i.Sector({shape:{cx:n(e.cx,1),cy:n(e.cy,1),r0:n(r.r0,1),r:n(r.r,1),startAngle:r.startAngle,endAngle:r.endAngle,clockwise:r.clockwise}});return t&&(o.shape.endAngle=r.startAngle,i.initProps(o,{shape:{endAngle:r.endAngle}},a)),o}t.createGridClipPath=r,t.createPolarClipPath=o,t.createClipPath=function(e,t,a){return e?"polar"===e.type?o(e,t,a):"cartesian2d"===e.type?r(e,t,a):null:null}},876:function(e,t,a){var i=a(527),n=a(491),r=a(523);a(745),a(877),i.extendComponentView({type:"grid",render:function(e,t){this.group.removeAll(),e.get("show")&&this.group.add(new r.Rect({shape:e.coordinateSystem.getRect(),style:n.defaults({fill:e.get("backgroundColor")},e.getItemStyle()),silent:!0,z2:-1}))}}),i.registerPreprocessor((function(e){e.xAxis&&e.yAxis&&!e.grid&&(e.grid={})}))},877:function(e,t,a){a(694),a(878)},878:function(e,t,a){var i=a(491),n=a(523),r=a(865),o=a(867),s=a(866),l=["axisLine","axisTickLabel","axisName"],c=["splitArea","splitLine"],d=o.extend({type:"cartesianAxis",axisPointerClass:"CartesianAxisPointer",render:function(e,t,a,o){this.group.removeAll();var u=this._axisGroup;if(this._axisGroup=new n.Group,this.group.add(this._axisGroup),e.get("show")){var h=e.getCoordSysModel(),g=s.layout(h,e),p=new r(e,g);i.each(l,p.add,p),this._axisGroup.add(p.getGroup()),i.each(c,(function(t){e.get(t+".show")&&this["_"+t](e,h)}),this),n.groupTransition(u,this._axisGroup,e),d.superCall(this,"render",e,t,a,o)}},remove:function(){this._splitAreaColors=null},_splitLine:function(e,t){var a=e.axis;if(!a.scale.isBlank()){var r=e.getModel("splitLine"),o=r.getModel("lineStyle"),s=o.get("color");s=i.isArray(s)?s:[s];for(var l=t.coordinateSystem.getRect(),c=a.isHorizontal(),d=0,u=a.getTicksCoords({tickModel:r}),h=[],g=[],p=o.getLineStyle(),f=0;f<u.length;f++){var x=a.toGlobalCoord(u[f].coord);c?(h[0]=x,h[1]=l.y,g[0]=x,g[1]=l.y+l.height):(h[0]=l.x,h[1]=x,g[0]=l.x+l.width,g[1]=x);var m=d++%s.length,y=u[f].tickValue;this._axisGroup.add(new n.Line({anid:null!=y?"line_"+u[f].tickValue:null,subPixelOptimize:!0,shape:{x1:h[0],y1:h[1],x2:g[0],y2:g[1]},style:i.defaults({stroke:s[m]},p),silent:!0}))}}},_splitArea:function(e,t){var a=e.axis;if(!a.scale.isBlank()){var r=e.getModel("splitArea"),o=r.getModel("areaStyle"),s=o.get("color"),l=t.coordinateSystem.getRect(),c=a.getTicksCoords({tickModel:r,clamp:!0});if(c.length){var d=s.length,u=this._splitAreaColors,h=i.createHashMap(),g=0;if(u)for(var p=0;p<c.length;p++){var f=u.get(c[p].tickValue);if(null!=f){g=(f+(d-1)*p)%d;break}}var x=a.toGlobalCoord(c[0].coord),m=o.getAreaStyle();s=i.isArray(s)?s:[s];for(p=1;p<c.length;p++){var y,v,A,b,_=a.toGlobalCoord(c[p].coord);a.isHorizontal()?(y=x,v=l.y,A=_-y,b=l.height,x=y+A):(y=l.x,v=x,A=l.width,x=v+(b=_-v));var w=c[p-1].tickValue;null!=w&&h.set(w,g),this._axisGroup.add(new n.Rect({anid:null!=w?"area_"+w:null,shape:{x:y,y:v,width:A,height:b},style:i.defaults({fill:s[g]},m),silent:!0})),g=(g+1)%d}this._splitAreaColors=h}}}});d.extend({type:"xAxis"}),d.extend({type:"yAxis"})}}]);
//# sourceMappingURL=Bar.80faecdc.chunk.js.map