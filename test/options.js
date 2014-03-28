var util = require("./util");



describe("Default and overriding options", function()
{
	it("should work with reusable instances", function(done)
	{
		var data,urls,instance;
		
		data =
		{
			site:                   "http://www.domain.com/asdf/",
			href:                   "http://www.domain.com/asdf/asdf",
			expected_ABSOLUTE:      "http://www.domain.com/asdf/asdf",
			expected_ROOT_RELATIVE: "/asdf/asdf",
			expected_SHORTEST:      "asdf"
		};
		
		// Test 1
		instance = new RelateUrl(data.site);
		
		urls =
		[
			instance.relate(data.href, {output:RelateUrl.ABSOLUTE}),
			instance.relate(data.site, data.href, {output:RelateUrl.ROOT_RELATIVE}),
			instance.relate(data.href),
			instance.relate(data.site, data.href)
		];
		
		expect(urls[0]).to.equal(data.expected_ABSOLUTE);
		expect(urls[1]).to.equal(data.expected_ROOT_RELATIVE);
		expect(urls[2]).to.equal(data.expected_SHORTEST);
		expect(urls[3]).to.equal(data.expected_SHORTEST);
		
		// Test 2
		instance = new RelateUrl(data.site, {output:RelateUrl.ROOT_RELATIVE});
		
		urls =
		[
			instance.relate(data.href, {output:RelateUrl.ABSOLUTE}),
			instance.relate(data.site, data.href, {output:RelateUrl.SHORTEST}),
			instance.relate(data.href),
			instance.relate(data.site, data.href)
		];
		
		expect(urls[0]).to.equal(data.expected_ABSOLUTE);
		expect(urls[1]).to.equal(data.expected_SHORTEST);
		expect(urls[2]).to.equal(data.expected_ROOT_RELATIVE);
		expect(urls[3]).to.equal(data.expected_ROOT_RELATIVE);
		
		done();
	});
	
	
	
	it("should work with single-use instances", function(done)
	{
		var data =
		{
			site:                   "http://www.domain.com/asdf/",
			href:                   "http://www.domain.com/asdf/asdf",
			expected_ABSOLUTE:      "http://www.domain.com/asdf/asdf",
			expected_ROOT_RELATIVE: "/asdf/asdf",
			expected_SHORTEST:      "asdf"
		};
		
		var urls =
		[
			RelateUrl.relate(data.site, data.href, {output:RelateUrl.ABSOLUTE}),
			RelateUrl.relate(data.site, data.href, {output:RelateUrl.ROOT_RELATIVE}),
			RelateUrl.relate(data.site, data.href),
			RelateUrl.relate(data.site, data.href)
		];
		
		expect(urls[0]).to.equal(data.expected_ABSOLUTE);
		expect(urls[1]).to.equal(data.expected_ROOT_RELATIVE);
		expect(urls[2]).to.equal(data.expected_SHORTEST);
		expect(urls[3]).to.equal(data.expected_SHORTEST);
		
		done();
	});
	
	
	
	it("should support options.defaultPorts", function(done)
	{
		var instance = new RelateUrl("http://www.domain.com/",
		{
			defaultPorts: {sftp:22, ssh:22},
			output: RelateUrl.ABSOLUTE
		});
		
		var urls =
		{
			http: instance.relate("http://user:pass@www.domain.com:80/"),
			sftp: instance.relate("sftp://user:pass@www.domain.com:22/"),
			ssh:  instance.relate("ssh://user:pass@www.domain.com:22/")
		};
		
		expect(urls.http).to.equal("http://user:pass@www.domain.com/");
		expect(urls.sftp).to.equal("sftp://user:pass@www.domain.com/");
		expect(urls.ssh ).to.equal("ssh://user:pass@www.domain.com/");
		
		done();
	});
	
	
	
	it("should support options.directoryIndexes", function(done)
	{
		var instance = new RelateUrl("http://www.domain.com/",
		{
			directoryIndexes: ["default.html"],
			output: RelateUrl.ABSOLUTE
		});
		
		var urls =
		{
			default: instance.relate("http://www.domain.com/default.html"),
			index:   instance.relate("http://www.domain.com/index.html")
		};
		
		expect(urls.default).to.equal("http://www.domain.com/");
		expect(urls.index  ).to.equal("http://www.domain.com/");
		
		done();
	});
	
	
	
	it("should support options.ignore_www = true", function(done)
	{
		var options =
		{
			ignore_www: true,
			output: RelateUrl.ROOT_RELATIVE
		};
		
		var instances =
		[
			new RelateUrl("http://www.domain.com/", options),
			new RelateUrl("http://domain.com/", options)
		];
		
		var urls =
		[
			instances[0].relate("http://www.domain.com/"),
			instances[0].relate("http://domain.com/"),
			instances[1].relate("http://www.domain.com/"),
			instances[1].relate("http://domain.com/")
		];
		
		expect(urls[0]).to.equal("/");
		expect(urls[1]).to.equal("/");
		expect(urls[2]).to.equal("/");
		expect(urls[3]).to.equal("/");
		
		done();
	});
	
	
	
	it("should support options.rejectedSchemes", function(done)
	{
		var instance = new RelateUrl("http://www.domain.com/",
		{
			output: RelateUrl.ABSOLUTE,
			rejectedSchemes: ["dunno"]
		});
		
		var urls =
		{
			dunno: instance.relate("dunno:some-stuff"),
			http:  instance.relate("http://www.domain.com/")
		};
		
		expect(urls.dunno).to.equal("dunno:some-stuff");
		expect(urls.http ).to.equal("http://www.domain.com/");
		
		done();
	});
	
	
	
	it("should support options.removeAuth = true", function(done)
	{
		var options =
		{
			output: RelateUrl.ROOT_RELATIVE,
			removeAuth: true
		};
		
		var instances =
		[
			new RelateUrl("http://user:pass@www.domain.com/", options),
			new RelateUrl("http://www.domain.com/", options)
		];
		
		var urls =
		[
			instances[0].relate("http://www.domain.com/"),
			instances[0].relate("http://user:pass@www.domain.com/"),
			instances[1].relate("http://user:pass@www.domain.com/")
		];
		
		expect(urls[0]).to.equal("/");
		expect(urls[1]).to.equal("/");
		expect(urls[2]).to.equal("/");
		
		done();
	});
	
	
	
	it("should support options.removeDirectoryIndexes = false", function(done)
	{
		var instance = new RelateUrl("http://www.domain.com/",
		{
			output: RelateUrl.ROOT_RELATIVE,
			removeDirectoryIndexes: false
		});
		
		var urls =
		[
			instance.relate("http://www.domain.com/index.html"),
			instance.relate("http://www.domain.com/other.html"),
		];
		
		expect(urls[0]).to.equal("/index.html");
		expect(urls[1]).to.equal("/other.html");
		
		done();
	});
	
	
	
	it("should support options.removeEmptyQueries = true", function(done)
	{
		var options =
		{
			output: RelateUrl.ROOT_RELATIVE,
			removeEmptyQueries: true
		};
		
		var instances =
		[
			new RelateUrl("http://www.domain.com/", options),
			new RelateUrl("http://www.other.com/", options)
		];
		
		var urls =
		[
			instances[0].relate("http://www.domain.com/?var1=&var2&var3="),
			instances[0].relate("http://www.domain.com/?var=&var2=asdf&var3"),
			instances[1].relate("http://www.domain.com/?var1=&var2&var3="),
			instances[1].relate("http://www.domain.com/?var=&var2=asdf&var3")
		];
		
		expect(urls[0]).to.equal("/");
		expect(urls[1]).to.equal("/?var2=asdf");
		expect(urls[2]).to.equal("//www.domain.com/?var1&var2&var3");
		expect(urls[3]).to.equal("//www.domain.com/?var&var2=asdf&var3");
		
		done();
	});
	
	
	
	it("should support options.schemeRelative = false", function(done)
	{
		var url = RelateUrl.relate("http://www.domain.com/", "http://www.other.com/",
		{
			output: RelateUrl.ROOT_RELATIVE,
			schemeRelative: false
		});
		
		expect(url).to.equal("http://www.other.com/");
		
		done();
	});
	
	
	
	it.skip("should support options.slashesDenoteHost = false", function(done)
	{
		var url = RelateUrl.relate("http://www.domain.com/", "http://www.other.com/",
		{
			output: RelateUrl.ROOT_RELATIVE,
			slashesDenoteHost: false
		});
		
		//expect(url).to.equal("http://www.other.com/");
		
		done();
	});
});
