(this["webpackJsonphtht-design"]=this["webpackJsonphtht-design"]||[]).push([[57],{150:function(e,r,t){var n={"./ApproximateTerrainHeights":162,"./ApproximateTerrainHeights.js":162,"./ArcGISTiledElevationTerrainProvider":316,"./ArcGISTiledElevationTerrainProvider.js":316,"./ArcType":52,"./ArcType.js":52,"./AssociativeArray":159,"./AssociativeArray.js":159,"./AttributeCompression":95,"./AttributeCompression.js":95,"./AxisAlignedBoundingBox":130,"./AxisAlignedBoundingBox.js":130,"./BingMapsApi":186,"./BingMapsApi.js":186,"./BingMapsGeocoderService":317,"./BingMapsGeocoderService.js":317,"./BoundingRectangle":75,"./BoundingRectangle.js":75,"./BoundingSphere":10,"./BoundingSphere.js":10,"./BoxGeometry":254,"./BoxGeometry.js":254,"./BoxOutlineGeometry":255,"./BoxOutlineGeometry.js":255,"./Cartesian2":12,"./Cartesian2.js":12,"./Cartesian3":4,"./Cartesian3.js":4,"./Cartesian4":31,"./Cartesian4.js":31,"./Cartographic":17,"./Cartographic.js":17,"./CartographicGeocoderService":282,"./CartographicGeocoderService.js":282,"./CatmullRomSpline":318,"./CatmullRomSpline.js":318,"./CesiumTerrainProvider":208,"./CesiumTerrainProvider.js":208,"./Check":5,"./Check.js":5,"./CircleGeometry":319,"./CircleGeometry.js":319,"./CircleOutlineGeometry":320,"./CircleOutlineGeometry.js":320,"./Clock":256,"./Clock.js":256,"./ClockRange":168,"./ClockRange.js":168,"./ClockStep":171,"./ClockStep.js":171,"./Color":59,"./Color.js":59,"./ColorGeometryInstanceAttribute":233,"./ColorGeometryInstanceAttribute.js":233,"./ComponentDatatype":11,"./ComponentDatatype.js":11,"./CompressedTextureBuffer":141,"./CompressedTextureBuffer.js":141,"./CoplanarPolygonGeometry":283,"./CoplanarPolygonGeometry.js":283,"./CoplanarPolygonGeometryLibrary":142,"./CoplanarPolygonGeometryLibrary.js":142,"./CoplanarPolygonOutlineGeometry":284,"./CoplanarPolygonOutlineGeometry.js":284,"./CornerType":54,"./CornerType.js":54,"./CorridorGeometry":285,"./CorridorGeometry.js":285,"./CorridorGeometryLibrary":143,"./CorridorGeometryLibrary.js":143,"./CorridorOutlineGeometry":286,"./CorridorOutlineGeometry.js":286,"./Credit":36,"./Credit.js":36,"./CubicRealPolynomial":203,"./CubicRealPolynomial.js":203,"./CullingVolume":120,"./CullingVolume.js":120,"./CylinderGeometry":287,"./CylinderGeometry.js":287,"./CylinderGeometryLibrary":144,"./CylinderGeometryLibrary.js":144,"./CylinderOutlineGeometry":288,"./CylinderOutlineGeometry.js":288,"./DefaultProxy":321,"./DefaultProxy.js":321,"./DeveloperError":3,"./DeveloperError.js":3,"./DistanceDisplayCondition":235,"./DistanceDisplayCondition.js":235,"./DistanceDisplayConditionGeometryInstanceAttribute":239,"./DistanceDisplayConditionGeometryInstanceAttribute.js":239,"./DoublyLinkedList":267,"./DoublyLinkedList.js":267,"./EarthOrientationParameters":204,"./EarthOrientationParameters.js":204,"./EarthOrientationParametersSample":131,"./EarthOrientationParametersSample.js":131,"./EasingFunction":250,"./EasingFunction.js":250,"./EllipseGeometry":188,"./EllipseGeometry.js":188,"./EllipseGeometryLibrary":139,"./EllipseGeometryLibrary.js":139,"./EllipseOutlineGeometry":189,"./EllipseOutlineGeometry.js":189,"./Ellipsoid":9,"./Ellipsoid.js":9,"./EllipsoidGeodesic":99,"./EllipsoidGeodesic.js":99,"./EllipsoidGeometry":172,"./EllipsoidGeometry.js":172,"./EllipsoidOutlineGeometry":190,"./EllipsoidOutlineGeometry.js":190,"./EllipsoidRhumbLine":70,"./EllipsoidRhumbLine.js":70,"./EllipsoidTangentPlane":66,"./EllipsoidTangentPlane.js":66,"./EllipsoidTerrainProvider":261,"./EllipsoidTerrainProvider.js":261,"./EllipsoidalOccluder":175,"./EllipsoidalOccluder.js":175,"./EncodedCartesian3":117,"./EncodedCartesian3.js":117,"./Event":35,"./Event.js":35,"./EventHelper":244,"./EventHelper.js":244,"./ExtrapolationType":268,"./ExtrapolationType.js":268,"./FeatureDetection":42,"./FeatureDetection.js":42,"./FrustumGeometry":191,"./FrustumGeometry.js":191,"./FrustumOutlineGeometry":289,"./FrustumOutlineGeometry.js":289,"./Fullscreen":176,"./Fullscreen.js":176,"./GeocodeType":122,"./GeocodeType.js":122,"./GeocoderService":322,"./GeocoderService.js":322,"./GeographicProjection":39,"./GeographicProjection.js":39,"./GeographicTilingScheme":49,"./GeographicTilingScheme.js":49,"./Geometry":13,"./Geometry.js":13,"./GeometryAttribute":14,"./GeometryAttribute.js":14,"./GeometryAttributes":18,"./GeometryAttributes.js":18,"./GeometryInstance":47,"./GeometryInstance.js":47,"./GeometryInstanceAttribute":269,"./GeometryInstanceAttribute.js":269,"./GeometryOffsetAttribute":25,"./GeometryOffsetAttribute.js":25,"./GeometryPipeline":40,"./GeometryPipeline.js":40,"./GeometryType":101,"./GeometryType.js":101,"./GoogleEarthEnterpriseMetadata":192,"./GoogleEarthEnterpriseMetadata.js":192,"./GoogleEarthEnterpriseTerrainData":211,"./GoogleEarthEnterpriseTerrainData.js":211,"./GoogleEarthEnterpriseTerrainProvider":323,"./GoogleEarthEnterpriseTerrainProvider.js":323,"./GoogleEarthEnterpriseTileInformation":210,"./GoogleEarthEnterpriseTileInformation.js":210,"./GregorianDate":132,"./GregorianDate.js":132,"./GroundPolylineGeometry":270,"./GroundPolylineGeometry.js":270,"./HeadingPitchRange":257,"./HeadingPitchRange.js":257,"./HeadingPitchRoll":170,"./HeadingPitchRoll.js":170,"./Heap":199,"./Heap.js":199,"./HeightmapEncoding":129,"./HeightmapEncoding.js":129,"./HeightmapTerrainData":65,"./HeightmapTerrainData.js":65,"./HeightmapTessellator":201,"./HeightmapTessellator.js":201,"./HermitePolynomialApproximation":290,"./HermitePolynomialApproximation.js":290,"./HermiteSpline":206,"./HermiteSpline.js":206,"./Iau2000Orientation":212,"./Iau2000Orientation.js":212,"./Iau2006XysData":205,"./Iau2006XysData.js":205,"./Iau2006XysSample":135,"./Iau2006XysSample.js":135,"./IauOrientationAxes":291,"./IauOrientationAxes.js":291,"./IauOrientationParameters":213,"./IauOrientationParameters.js":213,"./IndexDatatype":19,"./IndexDatatype.js":19,"./InterpolationAlgorithm":324,"./InterpolationAlgorithm.js":324,"./Intersect":48,"./Intersect.js":48,"./IntersectionTests":61,"./IntersectionTests.js":61,"./Intersections2D":138,"./Intersections2D.js":138,"./Interval":98,"./Interval.js":98,"./Ion":146,"./Ion.js":146,"./IonGeocoderService":292,"./IonGeocoderService.js":292,"./IonResource":193,"./IonResource.js":193,"./Iso8601":109,"./Iso8601.js":109,"./JulianDate":29,"./JulianDate.js":29,"./KeyboardEventModifier":179,"./KeyboardEventModifier.js":179,"./LagrangePolynomialApproximation":293,"./LagrangePolynomialApproximation.js":293,"./LeapSecond":134,"./LeapSecond.js":134,"./LinearApproximation":271,"./LinearApproximation.js":271,"./LinearSpline":187,"./LinearSpline.js":187,"./ManagedArray":262,"./ManagedArray.js":262,"./MapProjection":325,"./MapProjection.js":325,"./MapboxApi":272,"./MapboxApi.js":272,"./Math":6,"./Math.js":6,"./Matrix2":79,"./Matrix2.js":79,"./Matrix3":21,"./Matrix3.js":21,"./Matrix4":23,"./Matrix4.js":23,"./NearFarScalar":248,"./NearFarScalar.js":248,"./Occluder":294,"./Occluder.js":294,"./OffsetGeometryInstanceAttribute":243,"./OffsetGeometryInstanceAttribute.js":243,"./OpenCageGeocoderService":326,"./OpenCageGeocoderService.js":326,"./OrientedBoundingBox":50,"./OrientedBoundingBox.js":50,"./OrthographicFrustum":110,"./OrthographicFrustum.js":110,"./OrthographicOffCenterFrustum":163,"./OrthographicOffCenterFrustum.js":163,"./Packable":327,"./Packable.js":327,"./PackableForInterpolation":328,"./PackableForInterpolation.js":328,"./PeliasGeocoderService":214,"./PeliasGeocoderService.js":214,"./PerspectiveFrustum":115,"./PerspectiveFrustum.js":115,"./PerspectiveOffCenterFrustum":169,"./PerspectiveOffCenterFrustum.js":169,"./PinBuilder":273,"./PinBuilder.js":273,"./PixelFormat":158,"./PixelFormat.js":158,"./Plane":53,"./Plane.js":53,"./PlaneGeometry":295,"./PlaneGeometry.js":295,"./PlaneOutlineGeometry":296,"./PlaneOutlineGeometry.js":296,"./PolygonGeometry":297,"./PolygonGeometry.js":297,"./PolygonGeometryLibrary":84,"./PolygonGeometryLibrary.js":84,"./PolygonHierarchy":258,"./PolygonHierarchy.js":258,"./PolygonOutlineGeometry":298,"./PolygonOutlineGeometry.js":298,"./PolygonPipeline":30,"./PolygonPipeline.js":30,"./PolylineGeometry":274,"./PolylineGeometry.js":274,"./PolylinePipeline":64,"./PolylinePipeline.js":64,"./PolylineVolumeGeometry":299,"./PolylineVolumeGeometry.js":299,"./PolylineVolumeGeometryLibrary":102,"./PolylineVolumeGeometryLibrary.js":102,"./PolylineVolumeOutlineGeometry":300,"./PolylineVolumeOutlineGeometry.js":300,"./PrimitiveType":15,"./PrimitiveType.js":15,"./QuadraticRealPolynomial":100,"./QuadraticRealPolynomial.js":100,"./QuantizedMeshTerrainData":137,"./QuantizedMeshTerrainData.js":137,"./QuarticRealPolynomial":202,"./QuarticRealPolynomial.js":202,"./Quaternion":24,"./Quaternion.js":24,"./QuaternionSpline":301,"./QuaternionSpline.js":301,"./Queue":121,"./Queue.js":121,"./Ray":113,"./Ray.js":113,"./Rectangle":16,"./Rectangle.js":16,"./RectangleCollisionChecker":302,"./RectangleCollisionChecker.js":302,"./RectangleGeometry":275,"./RectangleGeometry.js":275,"./RectangleGeometryLibrary":147,"./RectangleGeometryLibrary.js":147,"./RectangleOutlineGeometry":276,"./RectangleOutlineGeometry.js":276,"./ReferenceFrame":245,"./ReferenceFrame.js":245,"./Request":60,"./Request.js":60,"./RequestErrorEvent":197,"./RequestErrorEvent.js":197,"./RequestScheduler":174,"./RequestScheduler.js":174,"./RequestState":62,"./RequestState.js":62,"./RequestType":78,"./RequestType.js":78,"./Resource":22,"./Resource.js":22,"./RuntimeError":28,"./RuntimeError.js":28,"./ScreenSpaceEventHandler":253,"./ScreenSpaceEventHandler.js":253,"./ScreenSpaceEventType":166,"./ScreenSpaceEventType.js":166,"./ShowGeometryInstanceAttribute":236,"./ShowGeometryInstanceAttribute.js":236,"./Simon1994PlanetaryPositions":277,"./Simon1994PlanetaryPositions.js":277,"./SimplePolylineGeometry":329,"./SimplePolylineGeometry.js":329,"./SphereGeometry":330,"./SphereGeometry.js":330,"./SphereOutlineGeometry":263,"./SphereOutlineGeometry.js":263,"./Spherical":303,"./Spherical.js":303,"./Spline":69,"./Spline.js":69,"./TaskProcessor":51,"./TaskProcessor.js":51,"./TerrainData":331,"./TerrainData.js":331,"./TerrainEncoding":82,"./TerrainEncoding.js":82,"./TerrainMesh":96,"./TerrainMesh.js":96,"./TerrainProvider":67,"./TerrainProvider.js":67,"./TerrainQuantization":177,"./TerrainQuantization.js":177,"./TileAvailability":136,"./TileAvailability.js":136,"./TileEdge":304,"./TileEdge.js":304,"./TileProviderError":77,"./TileProviderError.js":77,"./TilingScheme":332,"./TilingScheme.js":332,"./TimeConstants":63,"./TimeConstants.js":63,"./TimeInterval":118,"./TimeInterval.js":118,"./TimeIntervalCollection":251,"./TimeIntervalCollection.js":251,"./TimeStandard":83,"./TimeStandard.js":83,"./Tipsify":209,"./Tipsify.js":209,"./Transforms":76,"./Transforms.js":76,"./TranslationRotationScale":278,"./TranslationRotationScale.js":278,"./TridiagonalSystemSolver":207,"./TridiagonalSystemSolver.js":207,"./TrustedServers":200,"./TrustedServers.js":200,"./VRTheWorldTerrainProvider":333,"./VRTheWorldTerrainProvider.js":333,"./VertexFormat":26,"./VertexFormat.js":26,"./VideoSynchronizer":334,"./VideoSynchronizer.js":334,"./Visibility":180,"./Visibility.js":180,"./WallGeometry":305,"./WallGeometry.js":305,"./WallGeometryLibrary":148,"./WallGeometryLibrary.js":148,"./WallOutlineGeometry":306,"./WallOutlineGeometry.js":306,"./WebGLConstants":38,"./WebGLConstants.js":38,"./WebMercatorProjection":93,"./WebMercatorProjection.js":93,"./WebMercatorTilingScheme":165,"./WebMercatorTilingScheme.js":165,"./WeightSpline":307,"./WeightSpline.js":307,"./WindingOrder":45,"./WindingOrder.js":45,"./appendForwardSlash":181,"./appendForwardSlash.js":181,"./arrayFill":27,"./arrayFill.js":27,"./arrayRemoveDuplicates":33,"./arrayRemoveDuplicates.js":33,"./arraySlice":249,"./arraySlice.js":249,"./barycentricCoordinates":140,"./barycentricCoordinates.js":140,"./binarySearch":80,"./binarySearch.js":80,"./buildModuleUrl":43,"./buildModuleUrl.js":43,"./cancelAnimationFrame":335,"./cancelAnimationFrame.js":335,"./clone":160,"./clone.js":160,"./combine":108,"./combine.js":108,"./createGuid":237,"./createGuid.js":237,"./createWorldTerrain":308,"./createWorldTerrain.js":308,"./decodeGoogleEarthEnterpriseData":309,"./decodeGoogleEarthEnterpriseData.js":309,"./defaultValue":1,"./defaultValue.js":1,"./defineProperties":7,"./defineProperties.js":7,"./defined":0,"./defined.js":0,"./deprecationWarning":111,"./deprecationWarning.js":111,"./destroyObject":90,"./destroyObject.js":90,"./formatError":178,"./formatError.js":178,"./freezeObject":8,"./freezeObject.js":8,"./getAbsoluteUri":97,"./getAbsoluteUri.js":97,"./getBaseUri":182,"./getBaseUri.js":182,"./getExtensionFromUri":183,"./getExtensionFromUri.js":183,"./getFilenameFromUri":264,"./getFilenameFromUri.js":264,"./getImagePixels":195,"./getImagePixels.js":195,"./getMagic":252,"./getMagic.js":252,"./getStringFromTypedArray":114,"./getStringFromTypedArray.js":114,"./getTimestamp":92,"./getTimestamp.js":92,"./isArray":91,"./isArray.js":91,"./isBitSet":145,"./isBitSet.js":145,"./isBlobUri":124,"./isBlobUri.js":124,"./isCrossOriginUrl":125,"./isCrossOriginUrl.js":125,"./isDataUri":126,"./isDataUri.js":126,"./isLeapYear":133,"./isLeapYear.js":133,"./loadAndExecuteScript":127,"./loadAndExecuteScript.js":127,"./loadCRN":265,"./loadCRN.js":265,"./loadImageFromTypedArray":279,"./loadImageFromTypedArray.js":279,"./loadKTX":259,"./loadKTX.js":259,"./mergeSort":310,"./mergeSort.js":310,"./objectToQuery":184,"./objectToQuery.js":184,"./oneTimeWarning":116,"./oneTimeWarning.js":116,"./parseResponseHeaders":198,"./parseResponseHeaders.js":198,"./pointInsideTriangle":336,"./pointInsideTriangle.js":336,"./queryToObject":185,"./queryToObject.js":185,"./requestAnimationFrame":311,"./requestAnimationFrame.js":311,"./sampleTerrain":215,"./sampleTerrain.js":215,"./sampleTerrainMostDetailed":280,"./sampleTerrainMostDetailed.js":280,"./scaleToGeodeticSurface":128,"./scaleToGeodeticSurface.js":128,"./subdivideArray":312,"./subdivideArray.js":312,"./webGLConstantToGlslType":281,"./webGLConstantToGlslType.js":281,"./wrapFunction":313,"./wrapFunction.js":313,"./writeTextToCanvas":194,"./writeTextToCanvas.js":194};function i(e){var r=o(e);return t(r)}function o(e){if(!t.o(n,e)){var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}return n[e]}i.keys=function(){return Object.keys(n)},i.resolve=o,e.exports=i,i.id=150},167:function(e,r,t){"use strict";t.d(r,"d",(function(){return i})),t.d(r,"c",(function(){return a})),t.d(r,"e",(function(){return s})),t.d(r,"f",(function(){return l})),t.d(r,"h",(function(){return c})),t.d(r,"b",(function(){return m})),t.d(r,"g",(function(){return u})),t.d(r,"a",(function(){return j}));t(370);var n=t(164);function i(e){return e.reduce((function(e,r){return e.concat(Array.isArray(r)?i(r):r)}),[])}function o(e){return"[object Object]"===Object.prototype.toString.call(e)}function a(e){if(!o(e))throw new Error("obj \u4e0d\u662f\u4e00\u4e2a\u5bf9\u8c61\uff01");var r=Array.isArray(e)?[]:{};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=o(e[t])?a(e[t]):e[t]);return r}function s(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",t=r.replace(".",""),n=e.parentNode;if(e.tagName===t||-1!==Array.from(e.classList).indexOf(t))return e;for(var i=r.includes(".")?-1===Array.from(n.classList).indexOf(t):n.tagName!==t;i;)if(n=n.parentNode,i=r.includes(".")?-1===Array.from(n.classList).indexOf(t):n.tagName!==t,"HTML"===n.tagName)return;return n}function l(e,r,t){for(var n=e.length,i=[],o=0;o<n;o++){var a={component:e[o],code:r[o],desc:t[o]};i.push(a)}return i}function c(e,r,t){if(""!==r)switch(e.destroy(),e.config({top:document.documentElement.clientHeight-200,duration:1}),t){case"success":e.success(r);break;case"warning":e.warning(r);break;case"error":e.error(r);break;case"info":e.info(r);break;default:e.warning(r)}}function m(e){if(e&&"number"===typeof Number(e)){for(var r=["1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],t=[],n=Number(e),i=r.length,o=0;o<n;o++)t.push(r[Math.floor(Math.random()*i)]);return t.join("")}}function u(e,r,t){Array.from(e).forEach((function(e){e.classList.remove(t)})),r&&r.classList.add(t)}var j=t.n(n).a.createFromIconfontCN({scriptUrl:"//at.alicdn.com/t/font_1575007_am2j2qus0nt.js"})},260:function(e,r,t){"use strict";var n={};t.r(n),t.d(n,"hthtPrefix",(function(){return i}));var i="htht";t.d(r,"a",(function(){return n}))},363:function(e,r,t){e.exports=t.p+"static/media/icon_logo.3f3daae7.jpeg"},398:function(e,r,t){e.exports=t(490)},484:function(e,r,t){},486:function(e,r,t){},487:function(e,r,t){},488:function(e,r,t){},489:function(e,r,t){},490:function(e,r,t){"use strict";t.r(r);t(399);var n,i=t(94),o=t.n(i),a=t(2),s=t.n(a),l=t(119),c=t.n(l),m=t(72),u=t(365),j=t(107),y=t(366),d=t(43),p=t.n(d),g=t(362),h=t(156),G=Object(h.fromJS)({forced:!1}),f=Object(g.combineReducers)({Index:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G;arguments.length>1&&arguments[1];return e}}),T=Object(a.lazy)((function(){return t.e(56).then(t.bind(null,2257))})),E=Object(a.lazy)((function(){return Promise.all([t.e(4),t.e(54)]).then(t.bind(null,2249))})),P=Object(a.lazy)((function(){return Promise.all([t.e(4),t.e(55)]).then(t.bind(null,2252))})),b=[{name:"\u9996\u9875",path:"/home",component:s.a.createElement(T,null)},{name:"\u7ec4\u4ef6",path:"/comp-docs",component:s.a.createElement(E,null)},{name:"GIS\u63a5\u53e3",path:"/gis-docs",component:s.a.createElement(P,null)}],v=function(){return s.a.createElement("ul",null,b.map((function(e){return s.a.createElement("li",{key:e.path,className:"nav-item ".concat(e.path)},s.a.createElement(m.b,{to:e.path},e.name))})))},S=(t(392),t(346)),C=t.n(S),O=t(57),A=t(234),I=t.n(A),R=t(238),x=t.n(R),D=t(240),F=t.n(D),L=t(241),M=t.n(L),k=t(242),B=t.n(k),H=t(363),w=t.n(H),W=t(260),U=t(167),N=(t(484),W.a.hthtPrefix),V=Object(O.g)(n=function(e){function r(e){var t;return I()(this,r),(t=F()(this,M()(r).call(this,e))).lis=null,t}return B()(r,e),x()(r,[{key:"componentDidMount",value:function(){var e=this,r=document.getElementById("nav");this.lis=r.querySelectorAll("li"),r.addEventListener("click",(function(r){var t=r.target.parentNode;Object(U.g)(e.lis,t,"active")}),!1),this.setHighLight()}},{key:"componentDidUpdate",value:function(){this.setHighLight()}},{key:"setHighLight",value:function(){var e=this,r=this.props.location.pathname;this.lis.forEach((function(t){var n=t.className.split(" ")[1];r.includes(n)&&Object(U.g)(e.lis,t,"active")}))}},{key:"render",value:function(){return s.a.createElement("div",{id:"".concat(N,"-header")},s.a.createElement("div",{id:"logo"},s.a.createElement(m.b,{to:"/"},s.a.createElement("img",{src:w.a,alt:"logo"}),s.a.createElement("h1",null,"\u5357\u4eac\u822a\u5929\u5b8f\u56fe\u7ec4\u4ef6\u5e93"))),s.a.createElement("div",{id:"nav"},s.a.createElement(v,null)))}}]),r}(s.a.Component))||n;t(485),t(486),t(487),t(488),t(489);p.a.setBaseUrl("./cesium/");var q=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||j.b,Q=Object(j.c)(f,q());c.a.render(s.a.createElement(u.a,{store:Q},s.a.createElement(m.a,null,s.a.createElement(o.a,{locale:y.a},s.a.createElement(V,null),s.a.createElement((function(){return s.a.createElement("div",{className:"main-wrapper"},s.a.createElement(O.d,null,b.map((function(e){return s.a.createElement(O.b,{path:e.path,key:e.path},s.a.createElement(a.Suspense,{fallback:s.a.createElement(C.a,{size:"large"})},e.component))})),s.a.createElement(O.a,{to:"/home"})))}),null)))),document.getElementById("root"))}},[[398,58,60]]]);
//# sourceMappingURL=main.2ee85993.chunk.js.map