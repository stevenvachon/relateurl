"use strict";
const expect = require("chai").expect;
const relateURL = require("../lib/relateurl");
const tests = require("./helpers/tests.json");
const universalURL = require("universal-url");

const it_searchParamsOnly = universalURL.supportsSearchParams ? it : it.skip;
const URL = universalURL.URL;



function combinations(options, type)
{
	const _it = type==="common_deep" ? it_searchParamsOnly : it;
	const outputName = outputKey(options.output);
	//let skipped = 0;

	_it(`supports ${tests.length} different url combinations`, function()
	{
		this.timeout(6000);  // for the shim

		for (let i=0; i<tests.length; i++)
		{
			//if (tests[i].related[type][outputName] === null) { skipped++; continue }

			const base = new URL( tests[i].base );
			const url  = new URL( tests[i].url, base );
			expect( relateURL(url,base,options) ).to.equal( tests[i].related[type][outputName] );
		}

		//if (skipped > 0) console.log(`${skipped} skipped`);
	});
}



function options(/*...overrides*/)
{
	const resetOptions = 
	{
		output: relateURL.SHORTEST,

		// minurl options
		clone: false,
		defaultPorts: {},
		directoryIndexes: [],
		plusQueries: false,
		queryNames: [],
		removeDefaultPort: false,
		removeDirectoryIndex: false,
		removeEmptyDirectoryNames: false,
		removeEmptyHash: false,
		removeEmptyQueries: false,
		removeEmptyQueryNames: false,
		removeEmptyQueryValues: false,
		removeHash: false,
		removeQueryNames: false,
		removeQueryOddities: false,
		removeRootTrailingSlash: false,
		removeTrailingSlash: false,
		removeWWW: false,
		sortQueries: false,
		stringify: true  // special
	};

	// TODO :: use this when dropping Node v4 support
	//if (overrides == null) return resetOptions;
	//return Object.assign(resetOptions, ...overrides);

	const overrides = Array.from(arguments);
	if (overrides.length === 0) return resetOptions;
	return Object.assign.apply(undefined, [resetOptions].concat(overrides));
}



function outputKey(value)
{
	for (let key in relateURL)
	{
		if (relateURL[key] === value) return key;
	}
}



it(`has "common" options profile publicly available`, function()
{
	expect( relateURL.COMMON_PROFILE ).to.be.an("object");

	const originalValue = relateURL.COMMON_PROFILE;

	expect(() => relateURL.COMMON_PROFILE = "changed").to.throw(Error);
	expect(() => relateURL.COMMON_PROFILE.defaultPorts = "changed").to.throw(Error);
	expect(relateURL.COMMON_PROFILE).to.equal(originalValue);
});



it(`has "careful" options profile publicly available`, function()
{
	expect( relateURL.CAREFUL_PROFILE ).to.be.an("object");

	const originalValue = relateURL.CAREFUL_PROFILE;

	expect(() => relateURL.CAREFUL_PROFILE = "changed").to.throw(Error);
	expect(() => relateURL.CAREFUL_PROFILE.defaultPorts = "changed").to.throw(Error);
	expect(relateURL.CAREFUL_PROFILE).to.equal(originalValue);
});



it("has output levels available", function()
{
	expect(relateURL).to.contain.all.keys(["PROTOCOL_RELATIVE", "SHORTEST"]);

	const originalValue = relateURL.SHORTEST;

	expect(() => relateURL.SHORTEST = "changed").to.throw(Error);
	expect(relateURL.SHORTEST).to.equal(originalValue);
});



it("accepts URL input", function()
{
	const opts = options();
	const url  = new URL("http://domain.com/dir1/dir2/index.html");
	const base = new URL("http://domain.com/dir1/dir3/index.html");
	expect( relateURL(url,base,opts) ).to.equal("../dir2/index.html");
});



it("rejects non-URL input", function()
{
	const opts = options();
	let base,url;

	url  = "http://domain.com/dir1/dir2/index.html";
	base = "http://domain.com/dir1/dir3/index.html";
	expect(() => relateURL(url,base,opts)).to.throw(TypeError);

	url  = new URL("http://domain.com/dir1/dir2/index.html");
	base =         "http://domain.com/dir1/dir3/index.html";
	expect(() => relateURL(url,base,opts)).to.throw(TypeError);

	url  =         "http://domain.com/dir1/dir2/index.html";
	base = new URL("http://domain.com/dir1/dir3/index.html");
	expect(() => relateURL(url,base,opts)).to.throw(TypeError);
});



describe("options", function()
{
	it("clone = false", function()
	{
		const opts = options({ removeHash:true });
		const url  = new URL("http://domain.com/path#hash");
		const base = new URL("http://domain.com/");

		relateURL(url, base, opts);

		expect(url.hash).to.be.empty;
	});



	it("clone = true", function()
	{
		const opts = options({ clone:true, removeHash:true });
		const url  = new URL("http://domain.com/path#hash");
		const base = new URL("http://domain.com/");

		relateURL(url, base, opts);

		expect(url.hash).to.not.be.empty;
	});


	
	it_searchParamsOnly("removeEmptyQueryNames = true, removeEmptyQueryValues = true, removeQueryNames = true", function()
	{
		const opts = options({ queryNames:["var1"], removeEmptyQueryNames:true, removeEmptyQueryValues:true, removeQueryNames:true });
		const url  = new URL("http://domain.com/?var1=value&var2=&=value#hash");
		const base = new URL("http://domain.com/#hash");
		expect( relateURL(url,base,opts) ).to.equal("#hash");
	});



	it("stringify = false", function()
	{
		const opts = options({ stringify:false });
		const url  = new URL("http://domain.com/path");
		const base = new URL("http://domain.com/");
		expect( relateURL(url,base,opts) ).to.be.an.instanceOf(URL);
	});



	describe("in common profile; output = PROTOCOL_RELATIVE", function()
	{
		combinations( options(relateURL.COMMON_PROFILE, { output:relateURL.PROTOCOL_RELATIVE }), "common_deep" );
	});



	describe("in common profile; output = ROOT_PATH_RELATIVE", function()
	{
		combinations( options(relateURL.COMMON_PROFILE, { output:relateURL.ROOT_PATH_RELATIVE }), "common_deep" );
	});



	describe("in common profile; output = PATH_RELATIVE", function()
	{
		combinations( options(relateURL.COMMON_PROFILE, { output:relateURL.PATH_RELATIVE }), "common_deep" );
	});



	describe("in common profile; output = SHORTEST", function()
	{
		combinations(relateURL.COMMON_PROFILE, "common_deep");
	});



	// Simulate an incomplete `URL` implementation that's missing `URLSearchParams`
	describe("in common profile; output = PROTOCOL_RELATIVE, removeEmptyQueries = false, sortQueries = false", function()
	{
		combinations( options(relateURL.COMMON_PROFILE, { output:relateURL.PROTOCOL_RELATIVE, removeEmptyQueries:false, sortQueries:false }), "common_shallow" );
	});



	// Simulate an incomplete `URL` implementation that's missing `URLSearchParams`
	describe("in common profile; output = ROOT_PATH_RELATIVE, removeEmptyQueries = false, sortQueries = false", function()
	{
		combinations( options(relateURL.COMMON_PROFILE, { output:relateURL.ROOT_PATH_RELATIVE, removeEmptyQueries:false, sortQueries:false }), "common_shallow" );
	});



	// Simulate an incomplete `URL` implementation that's missing `URLSearchParams`
	describe("in common profile; output = PATH_RELATIVE, removeEmptyQueries = false, sortQueries = false", function()
	{
		combinations( options(relateURL.COMMON_PROFILE, { output:relateURL.PATH_RELATIVE, removeEmptyQueries:false, sortQueries:false }), "common_shallow" );
	});



	// Simulate an incomplete `URL` implementation that's missing `URLSearchParams`
	describe("in common profile; output = SHORTEST, removeEmptyQueries = false, sortQueries = false", function()
	{
		combinations( options(relateURL.COMMON_PROFILE, { removeEmptyQueries:false, sortQueries:false }), "common_shallow", "careful" );
	});



	describe("in careful profile; output = PROTOCOL_RELATIVE", function()
	{
		combinations( options(relateURL.CAREFUL_PROFILE, { output:relateURL.PROTOCOL_RELATIVE }), "careful" );
	});



	describe("in careful profile; output = ROOT_PATH_RELATIVE", function()
	{
		combinations( options(relateURL.CAREFUL_PROFILE, { output:relateURL.ROOT_PATH_RELATIVE }), "careful" );
	});



	describe("in careful profile; output = PATH_RELATIVE", function()
	{
		combinations( options(relateURL.CAREFUL_PROFILE, { output:relateURL.PATH_RELATIVE }), "careful" );
	});



	describe("in careful profile; output = SHORTEST", function()
	{
		combinations(relateURL.CAREFUL_PROFILE, "careful");
	});
});
