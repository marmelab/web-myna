---
id: references
title: References
---

## Functions

<dl>
<dt><a href="#getApiTokenName">getApiTokenName(api)</a> ⇒ <code>string</code></dt>
<dd><p>return the token name as environment variable from api name</p>
</dd>
<dt><a href="#getMissingEnvironmentTokens">getMissingEnvironmentTokens(apis, environment)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Returns an array of missing token names from the environment variables</p>
</dd>
<dt><a href="#transformBinaryToUtf8">transformBinaryToUtf8(value)</a> ⇒ <code>string</code></dt>
<dd><p>Transform a Binay (Buffer) into string</p>
</dd>
<dt><a href="#buildFlattenedNameValueMap">buildFlattenedNameValueMap(obj)</a> ⇒ <code>Array</code></dt>
<dd><p>Transform on object param/value in an array withe name from param and value from value</p>
</dd>
<dt><a href="#buildHar">buildHar(req, res, body, apiCall, apiName)</a> ⇒ <code>object</code></dt>
<dd><p>Prepare a json object ready to be transform in a valid .har file</p>
</dd>
<dt><a href="#myna">myna(apiConfig)</a> ⇒ <code>function</code></dt>
<dd><p>Description of the WebMyna Middleware.</p>
</dd>
</dl>

<a name="getApiTokenName"></a>

## getApiTokenName(api) ⇒ <code>string</code>
return the token name as environment variable from api name

**Kind**: global function  
**Returns**: <code>string</code> - The token name  

| Param | Type | Description |
| --- | --- | --- |
| api | <code>object</code> | the api object configuration |

**Example**  
```js
api name: rick-and-morty => token name RICK_AND_MORTY_TOKEN
```
<a name="getMissingEnvironmentTokens"></a>

## getMissingEnvironmentTokens(apis, environment) ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of missing token names from the environment variables

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - an array of missing token name from environment variables  

| Param | Type | Description |
| --- | --- | --- |
| apis | <code>Array.&lt;object&gt;</code> | an array of configured apis |
| environment | <code>object</code> | the environment from process.env |

<a name="transformBinaryToUtf8"></a>

## transformBinaryToUtf8(value) ⇒ <code>string</code>
Transform a Binay (Buffer) into string

**Kind**: global function  
**Returns**: <code>string</code> - - The returned binary convert in string  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Buffer</code> | The binary to convert |

<a name="buildFlattenedNameValueMap"></a>

## buildFlattenedNameValueMap(obj) ⇒ <code>Array</code>
Transform on object param/value in an array withe name from param and value from value

**Kind**: global function  
**Returns**: <code>Array</code> - - The transformed objet  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | The object to transform |

<a name="buildHar"></a>

## buildHar(req, res, body, apiCall, apiName) ⇒ <code>object</code>
Prepare a json object ready to be transform in a valid .har file

**Kind**: global function  
**Returns**: <code>object</code> - - The json object used to create the final .har file  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | the express request used for the request |
| res | <code>object</code> | The express response return by the reverse proxy |
| body | <code>object</code> | The body json response return by the reverse proxy |
| apiCall | <code>string</code> | The url used for api call |
| apiName | <code>string</code> | The mocked api name |

<a name="myna"></a>

## myna(apiConfig) ⇒ <code>function</code>
Description of the WebMyna Middleware.

**Kind**: global function  
**Returns**: <code>function</code> - - The curried middleware  

| Param | Type | Description |
| --- | --- | --- |
| apiConfig | <code>object</code> | Configuration for the current mocked api |

