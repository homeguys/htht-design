(this["webpackJsonphtht-design"]=this["webpackJsonphtht-design"]||[]).push([[37],{2173:function(e,t,a){e.exports=a.p+"static/media/codes.e5a5cc19.md"},2174:function(e){e.exports=JSON.parse('{"title":{"value":"MathUtil","detail":"\u4e00\u4e9b\u6570\u5b66\u65b9\u6cd5"},"Overview":{"value":"Overview","table":[{"Name":"MathUtil","Type":"Object","Summary":"\u4e00\u4e9b\u6570\u5b66\u65b9\u6cd5"}]},"Details":{"value":"Details","content":[{"title":"MathUtil","detail":"\u4e00\u4e9b\u6570\u5b66\u65b9\u6cd5"}]}}')},2207:function(e,t,a){"use strict";a.r(t);var n=a(233),l=a.n(n),c=a(234),r=a.n(c),i=a(235),s=a.n(i),m=a(236),u=a.n(m),o=a(237),h=a.n(o),d=a(2),E=a.n(d),v=a(499),p=a.n(v),f=a(2173),g=a.n(f),N=a(536),y=a(2174),k=function(e){function t(e){var a;return l()(this,t),(a=s()(this,u()(t).call(this,e))).state={codes:""},a}return h()(t,e),r()(t,[{key:"componentDidMount",value:function(){var e=this;p.a.get(g.a).then((function(t){var a=t.data.split("---").filter(Boolean);a=a.map((function(e){return e.replace(/```jsx/,"").replace(/```/,"").trim()})),e.setState({codes:a})}))}},{key:"render",value:function(){var e=this.state.codes;return E.a.createElement(N.a,{codes:e,desc:y})}}]),t}(E.a.Component);t.default=k},492:function(e,t,a){"use strict";var n=a(2),l=a.n(n),c=a(240).a.hthtPrefix;t.a=function(e){var t=e.children;return l.a.createElement("div",{id:"".concat(c,"-main-content")},l.a.createElement("div",{className:"content-wrapper"},t))}},494:function(e,t,a){"use strict";var n=a(233),l=a.n(n),c=a(234),r=a.n(c),i=a(235),s=a.n(i),m=a(236),u=a.n(m),o=a(367),h=a.n(o),d=a(237),E=a.n(d),v=a(493),p=a.n(v),f=a(2),g=a.n(f),N=a(501),y=a.n(N),k=function(e){function t(e){var a;return l()(this,t),a=s()(this,u()(t).call(this,e)),p()(h()(a),"highlightCode",(function(){for(var e=a.el.querySelectorAll("pre code"),t=0;t<e.length;t++)y.a.highlightBlock(e[t])})),a.setEl=a.setEl.bind(h()(a)),a}return E()(t,e),r()(t,[{key:"componentDidMount",value:function(){this.highlightCode()}},{key:"componentDidUpdate",value:function(){this.highlightCode()}},{key:"setEl",value:function(e){this.el=e}},{key:"render",value:function(){var e=this.props,t=e.children,a=e.className,n=e.element,l=e.innerHTML,c={ref:this.setEl,className:a};return l?(c.dangerouslySetInnerHTML={__html:t},n?g.a.createElement(n,c):g.a.createElement("div",c)):n?g.a.createElement(n,c,t):g.a.createElement("pre",{ref:this.setEl},g.a.createElement("code",{className:a},t))}}]),t}(g.a.Component);k.defaultProps={innerHTML:!1,className:null,element:null},t.a=k},536:function(e,t,a){"use strict";a(503);var n=a(504),l=a.n(n),c=(a(369),a(159)),r=a.n(c),i=a(2),s=a.n(i),m=a(494),u=a(492);a(537);t.a=function(e){var t=e.codes,a=e.desc;return s.a.createElement(u.a,null,s.a.createElement("article",null,s.a.createElement("section",{className:"content-title"},s.a.createElement("h1",null,a.title.value),s.a.createElement(m.a,{className:"javascript,js,jsx"},t[0]),s.a.createElement("p",{className:"main-desc"},a.title.detail),s.a.createElement("h2",null,"\u6a21\u5757\u8be6\u89e3",s.a.createElement(r.a,{type:"appstore"}))),s.a.createElement("div",{className:"gis-block"},s.a.createElement("h2",{className:"gis-block-title"},a.Overview.value),s.a.createElement("table",{className:"api-table"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null,"Name"),s.a.createElement("th",null,"Type"),s.a.createElement("th",null,"Summary"))),s.a.createElement("tbody",null,a.Overview.table.map((function(e,t){return s.a.createElement("tr",{key:t},s.a.createElement("td",null,e.Name),s.a.createElement("td",null,e.Type),s.a.createElement("td",null,e.Summary))}))))),s.a.createElement("div",{className:"gis-block"},s.a.createElement("h2",{className:"gis-block-title"},a.Details.value),a.Details.content.map((function(e,a){return s.a.createElement("div",{key:a},s.a.createElement("h3",{className:"gis-block-subtitle"},e.title),s.a.createElement("p",{className:"gis-block-detail"},e.detail),s.a.createElement(m.a,{className:"javascript,js,jsx"},t[a+1]))})))),s.a.createElement(l.a,{target:function(){return document.getElementById("htht-main-content")}}))}},537:function(e,t,a){}}]);
//# sourceMappingURL=MathUtil.4b89b3e6.chunk.js.map