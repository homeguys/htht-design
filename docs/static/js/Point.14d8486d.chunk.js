(this["webpackJsonphtht-design"]=this["webpackJsonphtht-design"]||[]).push([[39],{1234:function(e,t,a){"use strict";a(370);var l=a(164),n=a.n(l),r=a(2),c=a.n(r),s=a(537),i=a(546);a(1235);t.a=function(e){var t=e.codes,a=e.desc;return c.a.createElement(s.a,null,c.a.createElement("article",null,c.a.createElement("section",{className:"content-title"},c.a.createElement("h1",null,a.title.value),c.a.createElement(i.a,{className:"javascript,js,jsx"},t[0]),c.a.createElement("p",{className:"main-desc"},a.title.detail),c.a.createElement("h2",null,"\u6a21\u5757\u8be6\u89e3",c.a.createElement(n.a,{type:"appstore"}))),c.a.createElement("div",{className:"gis-block"},c.a.createElement("h2",{className:"gis-block-title"},a.Constructors.value),c.a.createElement(i.a,{className:"javascript,js,jsx"},t[1])),c.a.createElement("div",{className:"gis-block"},c.a.createElement("h2",{className:"gis-block-title"},a.PropertyOverview.value),c.a.createElement("table",{className:"api-table"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"Name"),c.a.createElement("th",null,"Type"),c.a.createElement("th",null,"Summary"))),c.a.createElement("tbody",null,a.PropertyOverview.table.map((function(e,t){return c.a.createElement("tr",{key:t},c.a.createElement("td",null,e.Name),c.a.createElement("td",null,e.Type),c.a.createElement("td",null,e.Summary))}))))),c.a.createElement("div",{className:"gis-block"},c.a.createElement("h2",{className:"gis-block-title"},a.PropertyDetails.value),a.PropertyDetails.content.map((function(e,a){return c.a.createElement("div",{key:a},c.a.createElement("h3",{className:"gis-block-subtitle"},e.title),c.a.createElement("p",{className:"gis-block-detail"},e.detail),c.a.createElement(i.a,{className:"javascript,js,jsx"},t[a+2]))}))),c.a.createElement("div",{className:"gis-block"},c.a.createElement("h2",{className:"gis-block-title"},a.MethodOverview.value),c.a.createElement("table",{className:"api-table"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"Name"),c.a.createElement("th",null,"Return Type"),c.a.createElement("th",null,"Summary"))),c.a.createElement("tbody",null,a.MethodOverview.table.map((function(e,t){return c.a.createElement("tr",{key:t},c.a.createElement("td",null,e.Name),c.a.createElement("td",null,e.ReturnType),c.a.createElement("td",null,e.Summary))}))))),c.a.createElement("div",{className:"gis-block"},c.a.createElement("h2",{className:"gis-block-title"},a.MethodDetails.value),a.MethodDetails.content.map((function(e,l){return c.a.createElement("div",{key:l},c.a.createElement("h3",{className:"gis-block-subtitle"},e.title),c.a.createElement("p",{className:"gis-block-detail"},e.detail),c.a.createElement(i.a,{className:"javascript,js,jsx"},t[l+2+a.PropertyDetails.content.length]))})))))}},1235:function(e,t,a){},2167:function(e,t,a){e.exports=a.p+"static/media/codes.fa29b07f.md"},2168:function(e){e.exports=JSON.parse('{"title":{"value":"BasePlottingInfo","detail":"\u586b\u56fe\u6570\u636e\u7684\u5b9e\u4f53"},"Constructors":{"value":"Constructors"},"PropertyOverview":{"value":"Property Overview","table":[{"Name":"x","Type":"num","Summary":"x"},{"Name":"y","Type":"num","Summary":"y"}]},"PropertyDetails":{"value":"Property Details","content":[{"title":"x","detail":"x"},{"title":"y","detail":"y"}]},"MethodOverview":{"value":"Method Overview","table":[{"Name":"null","ReturnType":"null","Summary":"null"}]},"MethodDetails":{"value":"Method Details","content":[{"title":"null","detail":"null"}]}}')},2214:function(e,t,a){"use strict";a.r(t);var l=a(234),n=a.n(l),r=a(238),c=a.n(r),s=a(240),i=a.n(s),m=a(241),u=a.n(m),o=a(242),d=a.n(o),h=a(2),E=a.n(h),v=a(643),p=a.n(v),y=a(2167),f=a.n(y),N=a(2168),b=a(1234),g=function(e){function t(e){var a;return n()(this,t),(a=i()(this,u()(t).call(this,e))).state={codes:""},a}return d()(t,e),c()(t,[{key:"componentDidMount",value:function(){var e=this;p.a.get(f.a).then((function(t){var a=t.data.split("---").filter(Boolean);a=a.map((function(e){return e.replace(/```jsx/,"").replace(/```/,"").trim()})),e.setState({codes:a})}))}},{key:"render",value:function(){var e=this.state.codes;return E.a.createElement(b.a,{codes:e,desc:N})}}]),t}(E.a.Component);t.default=g},537:function(e,t,a){"use strict";var l=a(2),n=a.n(l),r=a(260).a.hthtPrefix;t.a=function(e){var t=e.children;return n.a.createElement("div",{id:"".concat(r,"-main-content")},n.a.createElement("div",{className:"content-wrapper"},t))}},546:function(e,t,a){"use strict";var l=a(234),n=a.n(l),r=a(238),c=a.n(r),s=a(240),i=a.n(s),m=a(241),u=a.n(m),o=a(368),d=a.n(o),h=a(242),E=a.n(h),v=a(547),p=a.n(v),y=a(2),f=a.n(y),N=a(644),b=a.n(N),g=function(e){function t(e){var a;return n()(this,t),a=i()(this,u()(t).call(this,e)),p()(d()(a),"highlightCode",(function(){for(var e=a.el.querySelectorAll("pre code"),t=0;t<e.length;t++)b.a.highlightBlock(e[t])})),a.setEl=a.setEl.bind(d()(a)),a}return E()(t,e),c()(t,[{key:"componentDidMount",value:function(){this.highlightCode()}},{key:"componentDidUpdate",value:function(){this.highlightCode()}},{key:"setEl",value:function(e){this.el=e}},{key:"render",value:function(){var e=this.props,t=e.children,a=e.className,l=e.element,n=e.innerHTML,r={ref:this.setEl,className:a};return n?(r.dangerouslySetInnerHTML={__html:t},l?f.a.createElement(l,r):f.a.createElement("div",r)):l?f.a.createElement(l,r,t):f.a.createElement("pre",{ref:this.setEl},f.a.createElement("code",{className:a},t))}}]),t}(f.a.Component);g.defaultProps={innerHTML:!1,className:null,element:null},t.a=g}}]);
//# sourceMappingURL=Point.14d8486d.chunk.js.map