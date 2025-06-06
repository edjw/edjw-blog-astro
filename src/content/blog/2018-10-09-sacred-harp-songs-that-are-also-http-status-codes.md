---
title: Sacred Harp songs that are also HTTP Status Codes
pubDate: 2018-10-09T00:00:00Z
socialDescription: A list of Sacred Harp songs that are the same number as HTTP status codes
tags:
  - data
  - shapenote
---

This is another _really_ silly Sacred Harp one. Someone called "_404" (_[_Youth Will Soon Be Gone_](https://fasola.org/indexes/1991/?p=404)_)_ at a [Newcastle singing](https://web.archive.org/web/20170918140510/http://newcastleshapenote.co.uk/) recently and someone immediately said [Error Not Found](https://en.wikipedia.org/wiki/HTTP_404). As a result, this is a list of Sacred Harp songs that are also [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). 404 is probably the most famous status code but [there are lots](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

My wife estimated that this will be funny to about three people. That might be pushing it.

NB. I used [the Sacred Harp dataset](/blog/2018-10-08-a-dataset-for-sacred-harp-songs) I just published to work this out.

---

**100** – The Bower of Prayer

**100** Continue

This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.

---

**101b** – Holy City

**101** Switching Protocol

This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching to.

---

**101t** – Canaan’s Land

**101** Switching Protocol

This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching to.

---

**102** – Fulfillment

**102** Processing

This code indicates that the server has received and is processing the request, but no response is available yet.

---

**200** – Edom

**200** OK

The request has succeeded. The meaning of a success varies depending on the HTTP method:
GET: The resource has been fetched and is transmitted in the message body.
HEAD: The entity headers are in the message body.
PUT or POST: The resource describing the result of the action is transmitted in the message body.
TRACE: The message body contains the request message as received by the server

---

**201** – Pilgrim

**201** Created

The request has succeeded and a new resource has been created as a result of it. This is typically the response sent after a POST request, or after some PUT requests.

---

**202** – New Lebanon

**202** Accepted

The request has been received but not yet acted upon. It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.

---

**203** – Florida

**203** Non-Authoritative Information

This response code means returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. Except this condition, 200 OK response should be preferred instead of this response.

---

**204** – Mission

**204** No Content

There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.

---

**205** – Pleasant Hill

**205** Reset Content

This response code is sent after accomplishing request to tell user agent reset document view which sent this request.

---

**206** – Christian’s Hope

**206** Partial Content

This response code is used because of range header sent by the client to separate download into multiple streams.

---

**207** – Louisiana

**207** Multi-Status

A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.

---

**208** – Traveling On

**208** Multi-Status

Used inside a DAV: propstat response element to avoid enumerating the internal members of multiple bindings to the same collection repeatedly.

---

**300** – Calvary

**300** Multiple Choice

The request has more than one possible response. The user-agent or user should choose one of them. There is no standardized way of choosing one of the responses.

---

**301** – Greenland

**301** Moved Permanently

This response code means that the URI of the requested resource has been changed. Probably, the new URI would be given in the response.

---

**302** – Logan

**302** Found

This response code means that the URI of requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.

---

**303** – Heavenly Land

**303** See Other

The server sent this response to direct the client to get the requested resource at another URI with a GET request.

---

**304** – Morgan

**304** Not Modified

This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.

---

**306** – Oxford

**306** unused

This response code is no longer used, it is just reserved currently. It was used in a previous version of the HTTP 1.1 specification.

---

**308** – Parting Friends

**308** Permanent Redirect

This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: If a POST was used in the first request, a POST must be used in the second request.

---

**400** – Struggle On

**400** Bad Request

This response means that server could not understand the request due to invalid syntax.

---

**401** – Cuba

**401** Unauthorized

'Although the HTTP standard specifies unauthorized, semantically this response means unauthenticated. That is, the client must authenticate itself to get the requested response.'

---

**402** – Protection

**402** Payment Required

This response code is reserved for future use. Initial aim for creating this code was using it for digital payment systems however this is not used currently.

---

**403** – Heavenly Rest

**403** Forbidden

The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response. Unlike 401, the client's identity is known to the server.

---

**404** – Youth Will Soon Be Gone

**404** Not Found

The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurence on the web.

---

**405** – The Marcellas

**405** Method Not Allowed

The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.

---

**406** – New Harmony

**406** Not Acceptable

This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content following the criteria given by the user agent.

---

**407** – Charlton

**407** Proxy Authentication Required

This is similar to 401 but authentication is needed to be done by a proxy.

---

**408** – Weeping Mary

**408** Request Timeout

This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.

---

**409** – Promised Day

**409** Conflict

This response is sent when a request conflicts with the current state of the server.

---

**410b** – Mutual Love

**410** Gone

'This response would be sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for limited-time, promotional services. APIs should not feel compelled to indicate resources that have been deleted with this status code.'

---

**410t** – The Dying Californian

**410** Gone

'This response would be sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for limited-time, promotional services. APIs should not feel compelled to indicate resources that have been deleted with this status code.'

---

**411** – Morning Prayer

**411** Length Required

Server rejected the request because the Content-Length header field is not defined and the server requires it.

---

**412** – New Hosanna

**412** Precondition Failed

The client has indicated preconditions in its headers which the server does not meet.

---

**413** – The Loved Ones

**413** Payload Too Large

Request entity is larger than limits defined by server; the server might close the connection or return an Retry-After header field.

---

**414** – Parting Friend

**414** URI Too Long

The URI requested by the client is longer than the server is willing to interpret.

---

**415** – Easter Morn

**415** Unsupported Media Type

The media format of the requested data is not supported by the server, so the server is rejecting the request.

---

**416** – The Christian’s Nightly Song

**416** Requested Range Not Satisfiable

The range specified by the Range header field in the request can't be fulfilled; it's possible that the range is outside the size of the target URI's data.

---

**417** – Weeping Pilgrim

**417** Expectation Failed

This response code means the expectation indicated by the Expect request header field can't be met by the server.

---

**418** – Reese

**418** I'm a teapot

The server refuses the attempt to brew coffee with a teapot.

---

**421** – Sweet Morning

**421** Misdirected Request

The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.

---

**422** – Burdette

**422** Unprocessable Entity

The request was well-formed but was unable to be followed due to semantic errors.

---

**423** – Grantville

**423** Locked

The resource that is being accessed is locked.

---

**424** – Sweet Union

**424** Failed Dependency

The request failed due to failure of a previous request.

---

**425** – Golden Streets

**425** Too Early

Indicates that the server is unwilling to risk processing a request that might be replayed.

---

**426b** – Jasper

**426** Upgrade Required

The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol. The server sends an Upgrade header in a 426 response to indicate the required protocol\[s\].

---

**426t** – Kelley

**426** Upgrade Required

The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol. The server sends an Upgrade header in a 426 response to indicate the required protocol\[s\].

---

**428** – World Unknown

**428** Precondition Required

The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.

---

**429** – Christian’s Delight

**429** Too Many Requests

The user has sent too many requests in a given amount of time (rate limiting).

---

**431** – New Bethany

**431** Request Header Fields Too Large

The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.

---

**451** – Mary’s Grief and Joy

**451** Unavailable For Legal Reasons

The user requests an illegal resource, such as a web page censored by a government.

---

**500** – Living Hope

**500** Internal Server Error

The server has encountered a situation it doesn't know how to handle.

---

**501** – O’Leary

**501** Not Implemented

The request method is not supported by the server and cannot be handled. The only methods that servers are required to support \[and therefore that must not return this code\] are GET and HEAD.

---

**502** – A Charge to Keep

**502** Bad Gateway

This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.

---

**503** – Lloyd

**503** Service Unavailable

The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This responses should be used for temporary conditions and the Retry-After: HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.

---

**504** – Wood Street

**504** Gateway Timeout

This error response is given when the server is acting as a gateway and cannot get a response in time.

---

**505** – Where Ceaseless Ages Roll

**505** HTTP Version Not Supported

The HTTP version used in the request is not supported by the server.

---

**506** – The Ark

**506** Variant Also Negotiates

The server has an internal configuration error: transparent content negotiation for the request results in a circular reference.

---

**507** – Sermon on the Mount

**507** Insufficient Storage

The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.

---

**510** – Corley

**510** Not Extended

Further extensions to the request are required for the server to fulfill it.

---

**511** – The Great Redeemer

**511** Network Authentication Required

The 511 status code indicates that the client needs to authenticate to gain network access.
