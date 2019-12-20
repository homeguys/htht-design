```jsx
import { ELECONFIG, returnEleStyle } from '../webMap/config/productConfig'
```

---

```jsx
const ELECONFIG = {
  NDVI: {
    url: 'http://192.168.1.238:16080/geoserver/yn3/wms',
    layerName: 'yn3:NDVI'
  },
  TVDI: {
    url: 'http://192.168.1.238:16080/geoserver/yn3/wms',
    layerName: 'yn3:TVDI'
  },
  WA: {
    url: 'http://192.168.1.238:16080/geoserver/yn3/wms',
    layerName: 'yn3:WA'
  }
}
```

---

```jsx
function rgb216(color) {
  let rgb = color.split(',');
  let r = parseInt(rgb[0].split('(')[1]);
  let g = parseInt(rgb[1]);
  let b = parseInt(rgb[2].split(')')[0]);
  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}
```

---

```jsx
function returnEleStyle (ele,opacity=1) {

  let result, colors, styleLayerName, colorsString
  switch (ele) {
    case productEnum.NDVI:
      colors = [
        {
          color:rgb216('rgb(121,20,0)') ,
          value: '0',
          opacity:opacity
        },
        {
          color:rgb216('rgb(255,150,0)') ,
          value: '0.1'
        },
        {
          color: rgb216('rgb(255,200,1)') ,
          value: '0.2'
        },
        {
          color: rgb216('rgb(179,200,0)') ,
          value: '0.3'
        },
        {
          color: rgb216('rgb(1,180,0)') ,
          value: '0.4'
        },
        {
          color: rgb216('rgb(0,150,0)') ,
          value: '0.5'
        },
        {
          color: rgb216('rgb(0,100,0)') ,
          value: '0.6'
        },
        {
          color: rgb216('rgb(0,60,0)') ,
          value: '0.7'
        },
        {
          color: rgb216('rgb(0,40,0)') ,
          value: '0.8'
        },
        {
          color: rgb216('rgb(0,31,0)') ,
          value: '0.9'
        }
      ]
      styleLayerName = `<Name>${ELECONFIG.NDVI.layerName}</Name>`
      colorsString = ''
      colors.forEach(item => {
        if (item.opacity) {
          colorsString = colorsString + `<ColorMapEntry color="${item.color}" quantity="${item.value}" opacity="${item.opacity}"/>`
        } else {
          colorsString = colorsString + `<ColorMapEntry color="${item.color}" quantity="${item.value}"/>`
        }
      })
      result = `<?xml version="1.0" encoding="UTF-8"?>
    <StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
    <NamedLayer>
    ${styleLayerName}
    <UserStyle>
    <Name>style</Name>
    <Title>NDVI distribution</Title>
    <FeatureTypeStyle>
    <Rule>
    <RasterSymbolizer>
    <Opacity>1.0</Opacity>
    <ColorMap>
    ${colorsString}
    </ColorMap>
    </RasterSymbolizer>
    </Rule>
    </FeatureTypeStyle>
    </UserStyle>
    </NamedLayer>
    </StyledLayerDescriptor>`
      break
    case productEnum.TVDI:
      colors = [
        {
          color:rgb216('rgb(85,255,0)') ,
          value: '0',
        },
        {
          color: rgb216('rgb(255,255,0)') ,
          value: '0.6'
        },
        {
          color: rgb216('rgb(255,170,0)') ,
          value: '0.7'
        },
        {
          color: rgb216('rgb(255,0,0)') ,
          value: '0.8'
        },
        {
          color: rgb216('rgb(168,0,0)') ,
          value: '0.9'
        }
      ]
      styleLayerName = `<Name>${ELECONFIG.TVDI.layerName}</Name>`
      colorsString = ''
      colors.forEach(item => {
        if (item.opacity) {
          colorsString = colorsString + `<ColorMapEntry color="${item.color}" quantity="${item.value}" opacity="${item.opacity}"/>`
        } else {
          colorsString = colorsString + `<ColorMapEntry color="${item.color}" quantity="${item.value}"/>`
        }
      })
      result = `<?xml version="1.0" encoding="UTF-8"?>
    <StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
    <NamedLayer>
    ${styleLayerName}
    <UserStyle>
    <Name>style</Name>
    <Title>NDVI distribution</Title>
    <FeatureTypeStyle>
    <Rule>
    <RasterSymbolizer>
    <Opacity>1.0</Opacity>
    <ColorMap>
    ${colorsString}
    </ColorMap>
    </RasterSymbolizer>
    </Rule>
    </FeatureTypeStyle>
    </UserStyle>
    </NamedLayer>
    </StyledLayerDescriptor>`
      break
    case productEnum.WA:
      colors = [
        {
          color: rgb216('rgb(151,219,242)') ,
          value: '0.5'
        },
        {
          color: rgb216('rgb(151,219,242)') ,
          value: '1.5'
        }
      ]
      styleLayerName = `<Name>${ELECONFIG.WA.layerName}</Name>`
      colorsString = ''
      colors.forEach(item => {
        if (item.opacity) {
          colorsString = colorsString + `<ColorMapEntry color="${item.color}" quantity="${item.value}" opacity="${item.opacity}"/>`
        } else {
          colorsString = colorsString + `<ColorMapEntry color="${item.color}" quantity="${item.value}"/>`
        }
      })
      result = `<?xml version="1.0" encoding="UTF-8"?>
    <StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
    <NamedLayer>
    ${styleLayerName}
    <UserStyle>
    <Name>style</Name>
    <Title>NDVI distribution</Title>
    <FeatureTypeStyle>
    <Rule>
    <RasterSymbolizer>
    <Opacity>1.0</Opacity>
    <ColorMap>
    ${colorsString}
    </ColorMap>
    </RasterSymbolizer>
    </Rule>
    </FeatureTypeStyle>
    </UserStyle>
    </NamedLayer>
    </StyledLayerDescriptor>`
      break

    default:
      break
  }

  return result
}
```
