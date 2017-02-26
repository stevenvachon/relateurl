"use strict";
const customizeURL = require("incomplete-url");
const {describe, it} = require("mocha");
const {expect} = require("chai");
const relateURL = require("./");
const tests = require("./helpers/tests.json");
const {URL} = require("universal-url");



const combinations = (options, type) =>
{
	const _URL = type==="common_deep" ? URL : customizeURL({ urlExclusions:["searchParams"] }).IncompleteURL;
	const outputName = outputKey(options.output);
	//let skipped = 0;

	if (type !== "common_deep")
	{
		// Instances of `IncompleteURL` cannot be cloned normally
		options = { ...options, clone:false };
	}

	it(`supports ${tests.length} different url combinations`, function()
	{
		this.timeout(10000);  // for the shim

		for (let i=0; i<tests.length; i++)
		{
			const relativeURL = tests[i].related[type][outputName];

			//if (relativeURL === null) { skipped++; continue }

			const base = new _URL( tests[i].base );
			const url  = new _URL( tests[i].url, base );
			expect( relateURL(url,base,options) ).to.equal(relativeURL);

			//console.log(i, type)
			//console.log(tests[i].url)
			//console.log(tests[i].base)
			//console.log("=======")
		}

		//if (skipped > 0) console.log(`${skipped} skipped`);
	});
};



const options = overrides =>
({
	output: relateURL.SHORTEST,

	// minurl options
	clone: false,
	defaultPorts: {},
	indexFilenames: [],
	plusQueries: false,
	queryNames: [],
	removeAuth: false,
	removeDefaultPort: false,
	removeEmptyHash: false,
	removeEmptyQueries: false,
	removeEmptyQueryNames: false,
	removeEmptyQueryValues: false,
	removeEmptySegmentNames: false,
	removeHash: false,
	removeIndexFilename: false,
	removeQueryNames: false,
	removeQueryOddities: false,
	removeRootTrailingSlash: false,
	removeTrailingSlash: false,
	removeWWW: false,
	sortQueries: false,
	stringify: true,  // special
	...overrides
});



const outputKey = value => Object.keys(relateURL).find(key => relateURL[key] === value);



it(`has "common" options profile publicly available`, () =>
{
	expect( relateURL.COMMON_PROFILE ).to.be.an("object");

	const originalValue = relateURL.COMMON_PROFILE;

	expect(() => relateURL.COMMON_PROFILE.defaultPorts = "changed").to.throw(Error);
	expect(() => relateURL.COMMON_PROFILE.nonExistent = "new").to.throw(Error);
	expect(relateURL.COMMON_PROFILE).to.deep.equal(originalValue);

	expect(() => relateURL.COMMON_PROFILE = "changed").to.throw(Error);
	expect(relateURL.COMMON_PROFILE).to.equal(originalValue);
});



it(`has "careful" options profile publicly available`, () =>
{
	expect( relateURL.CAREFUL_PROFILE ).to.be.an("object");

	const originalValue = relateURL.CAREFUL_PROFILE;

	expect(() => relateURL.CAREFUL_PROFILE.defaultPorts = "changed").to.throw(Error);
	expect(() => relateURL.CAREFUL_PROFILE.nonExistent = "new").to.throw(Error);
	expect(relateURL.CAREFUL_PROFILE).to.deep.equal(originalValue);

	expect(() => relateURL.CAREFUL_PROFILE = "changed").to.throw(Error);
	expect(relateURL.CAREFUL_PROFILE).to.equal(originalValue);
});



it("has output levels available", () =>
{
	expect(relateURL).to.contain.all.keys(["PROTOCOL_RELATIVE", "SHORTEST"]);

	const originalValue = relateURL.SHORTEST;

	expect(() => relateURL.SHORTEST = "changed").to.throw(Error);
	expect(relateURL.SHORTEST).to.equal(originalValue);
});



it("accepts URL input", () =>
{
	const opts = options();
	const url  = new URL("http://domain.com/dir1/dir2/index.html");
	const base = new URL("http://domain.com/dir1/dir3/index.html");
	expect( relateURL(url,base,opts) ).to.equal("../dir2/index.html");
});



it("rejects non-URL input", () =>
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



describe("options", () =>
{
	it("clone = false", () =>
	{
		const opts = options({ removeHash:true });
		const url  = new URL("http://domain.com/path#hash");
		const base = new URL("http://domain.com/");

		relateURL(url, base, opts);

		expect(url.hash).to.be.empty;
	});



	it("clone = true", () =>
	{
		const opts = options({ clone:true, removeHash:true });
		const url  = new URL("http://domain.com/path#hash");
		const base = new URL("http://domain.com/");

		relateURL(url, base, opts);

		expect(url.hash).to.not.be.empty;
	});



	it("removeAuth = false", () =>
	{
		const opts = options();
		let base, url;

		url  = new URL("http://user:pass@domain.com/");
		base = new URL("http://domain.com/");
		expect( relateURL(url,base,opts) ).to.equal("//user:pass@domain.com/");

		url  = new URL("http://domain.com/");
		base = new URL("http://user:pass@domain.com/");
		expect( relateURL(url,base,opts) ).to.equal("//domain.com/");
	});



	it("removeAuth = true", () =>
	{
		const opts = options({ removeAuth:true });
		let base, url;

		url  = new URL("http://user:pass@domain.com/");
		base = new URL("http://domain.com/");
		expect( relateURL(url,base,opts) ).to.equal("");

		url  = new URL("http://domain.com/");
		base = new URL("http://user:pass@domain.com/");
		expect( relateURL(url,base,opts) ).to.equal("");
	});



	it("removeEmptyQueryNames = true, removeEmptyQueryValues = true, removeQueryNames = true", () =>
	{
		const opts = options({ queryNames:["var1"], removeEmptyQueryNames:true, removeEmptyQueryValues:true, removeQueryNames:true });
		const url  = new URL("http://domain.com/?var1=value&var2=&=value#hash");
		const base = new URL("http://domain.com/#hash");
		expect( relateURL(url,base,opts) ).to.equal("#hash");
	});



	it("stringify = false", () =>
	{
		const opts = options({ stringify:false });
		const url  = new URL("http://domain.com/path");
		const base = new URL("http://domain.com/");
		expect( relateURL(url,base,opts) ).to.be.an.instanceOf(URL);
	});



	describe("in common profile; output = PROTOCOL_RELATIVE", () =>
	{
		combinations( options({ ...relateURL.COMMON_PROFILE, output:relateURL.PROTOCOL_RELATIVE }), "common_deep" );
	});



	describe("in common profile; output = ROOT_PATH_RELATIVE", () =>
	{
		combinations( options({ ...relateURL.COMMON_PROFILE, output:relateURL.ROOT_PATH_RELATIVE }), "common_deep" );
	});



	describe("in common profile; output = PATH_RELATIVE", () =>
	{
		combinations( options({ ...relateURL.COMMON_PROFILE, output:relateURL.PATH_RELATIVE }), "common_deep" );
	});



	describe("in common profile; output = SHORTEST", () =>
	{
		combinations(relateURL.COMMON_PROFILE, "common_deep");
	});



	// Simulate an incomplete `URL` implementation that's missing `URLSearchParams`
	describe("in common profile; output = PROTOCOL_RELATIVE, removeEmptyQueries = false, sortQueries = false", () =>
	{
		combinations( options({ ...relateURL.COMMON_PROFILE, output:relateURL.PROTOCOL_RELATIVE, removeEmptyQueries:false, sortQueries:false }), "common_shallow" );
	});



	// Simulate an incomplete `URL` implementation that's missing `URLSearchParams`
	describe("in common profile; output = ROOT_PATH_RELATIVE, removeEmptyQueries = false, sortQueries = false", () =>
	{
		combinations( options({ ...relateURL.COMMON_PROFILE, output:relateURL.ROOT_PATH_RELATIVE, removeEmptyQueries:false, sortQueries:false }), "common_shallow" );
	});



	// Simulate an incomplete `URL` implementation that's missing `URLSearchParams`
	describe("in common profile; output = PATH_RELATIVE, removeEmptyQueries = false, sortQueries = false", () =>
	{
		combinations( options({ ...relateURL.COMMON_PROFILE, output:relateURL.PATH_RELATIVE, removeEmptyQueries:false, sortQueries:false }), "common_shallow" );
	});



	// Simulate an incomplete `URL` implementation that's missing `URLSearchParams`
	describe("in common profile; output = SHORTEST, removeEmptyQueries = false, sortQueries = false", () =>
	{
		combinations( options({ ...relateURL.COMMON_PROFILE, removeEmptyQueries:false, sortQueries:false }), "common_shallow", "careful" );
	});



	describe("in careful profile; output = PROTOCOL_RELATIVE", () =>
	{
		combinations( options({ ...relateURL.CAREFUL_PROFILE, output:relateURL.PROTOCOL_RELATIVE }), "careful" );
	});



	describe("in careful profile; output = ROOT_PATH_RELATIVE", () =>
	{
		combinations( options({ ...relateURL.CAREFUL_PROFILE, output:relateURL.ROOT_PATH_RELATIVE }), "careful" );
	});



	describe("in careful profile; output = PATH_RELATIVE", () =>
	{
		combinations( options({ ...relateURL.CAREFUL_PROFILE, output:relateURL.PATH_RELATIVE }), "careful" );
	});



	describe("in careful profile; output = SHORTEST", () =>
	{
		combinations(relateURL.CAREFUL_PROFILE, "careful");
	});
});
