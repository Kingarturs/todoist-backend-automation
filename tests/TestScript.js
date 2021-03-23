var newman = require("newman");
require("dotenv").config();

const token = process.env.token;
const baseUrl = process.env.baseUrl;

newman.run(
	{
		collection: "tests/collection/Todoist.json",
		reporters: ['htmlextra'],
		reporter: {
			htmlextra: {
				export: "tests/reports/report.html",
			},
		},
		envVar: [ 
			{ "key":"token", "value": token },
			{ "key":"baseURL", "value": baseUrl }
		]
	},
	function (err, summary) {
		if (err) {
			throw err;
		}
		console.info("Root collection run complete!");
	}
);

newman.run(
	{
		collection: "tests/collection/Tasks.json",
		reporters: ['htmlextra'],
		reporter: {
			htmlextra: {
				export: "tests/reports/reportCSV.html",
			},
		},
		envVar: [ 
			{ "key":"token", "value": token },
			{ "key":"baseURL", "value": baseUrl }
		],
		iterationData: "tests/data/tasks.csv"
	},
	function (err, summary) {
		if (err) {
			throw err;
		}
		console.info("CSV task creation run complete!");
	}
);
