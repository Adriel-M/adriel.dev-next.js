<?xml version="1.0" encoding="utf-8"?>
<!--
MIT License

Copyright (c) 2023 Andrew Marcuse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
-->
<xsl:stylesheet version="3.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:atom="http://www.w3.org/2005/Atom">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
	<xsl:variable name="owner_url"><xsl:value-of select="/rss/channel/link"/></xsl:variable>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="referrer" content="unsafe-url" />
		<title><xsl:value-of select="/rss/channel/title"/></title>
		<link rel="stylesheet" href="/static/feed/water.light.css" />
		<script src="/static/feed/clickToCopy.js"></script>
	</head>
	<body>
		<h1><xsl:value-of select="/rss/channel/title"/></h1>

		<p>
			<xsl:value-of select="/rss/channel/description"/>
		</p>

		<p>This is the RSS feed for the
			<a><xsl:attribute name="href">
				<xsl:value-of select="/rss/channel/link"/>
			</xsl:attribute>
			<xsl:value-of select="/rss/channel/title"/></a>
			website.
		</p>

		<p>It is meant for news readers, not humans.  Please copy-and-paste the URL into your news reader!</p>

		<p>
			<pre>
				<code id="feedUrl"><xsl:value-of select="/rss/channel/atom:link/@href"/></code>
			</pre>
			<button
				id="copyButton">
				Copy to clipboard
			</button>
		</p>
		<script>
			clickToCopy("copyButton", "feedUrl")
		</script>

		<ul>
		<xsl:for-each select="/rss/channel/item">
			<li>
				<xsl:value-of select="title" />
				(<xsl:value-of select="pubDate" />)
			</li>
		</xsl:for-each>
		</ul>
		<p><xsl:value-of select="count(/rss/channel/item)"/> news items.</p>
		<p><small>Powered by <a rel="noopener noreferrer" href="https://www.feed.style/">Feed.Style</a></small></p>
	</body>
</html>
	</xsl:template>
</xsl:stylesheet>
