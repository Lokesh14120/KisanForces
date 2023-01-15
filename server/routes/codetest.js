const router = require("express").Router();
const Job = require("../models/Job");
const axios = require('axios')
const qs = require('qs');
const Problem = require("../models/Problem");

router.post("/runtest", async (req, res) => {
    let { language, code, problemId, userId } = req.body;
    if (code === undefined || !code) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
    }
    try {
        (async () => {
            const job = new Job({ language, code, problemId, userId });
            await job.save();
            const jobId = job._id;
            const problem = await Problem.findById(problemId);

            if (job === undefined || problem === undefined) {
                throw Error(`Invalid job/problem id`);
            }

            const testcases = problem.testcase;

            try {
                let output;
                job["startedAt"] = new Date();
                job["userId"] = userId;
                job["problemId"] = problemId;
                let passed = true;
                const checkTestcase = testcases.map(async (item) => {
                    try {
                        if (language === "cpp" || language === "c"||language==="py") {
                            var data = qs.stringify({
                                'code': code,
                                'language': language,
                                'input': item.input
                            });
                            var config = {
                                method: 'post',
                                url: 'https://api.codex.jaagrav.in',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                data: data
                            };
                            const response = await axios(config);
                            output = response.data.output;
                            console.log("output",output);
                            // console.log("output",output);
                            console.log("output item",item.output);
                            if (response.data.output.replace(/\n/g,'').trim() !== item.output.trim()) {
                                console.log("output fail",output);
                                passed = false;
                            }
                            else{
                                console.log("match");
                            }
                        }
                    } catch (error) {
                        console.log({ error });
                    }
                });
                await Promise.all(checkTestcase);
                if (passed) {
                    console.log("correct");
                    job["verdict"] = "ac"
                }
                else {
                    job["verdict"] = "wa"
                    // job["verdict"] = "ac"
                }
                job["completedAt"] = new Date();
                job["status"] = "success";
                job["output"] = output;
                await job.save();
            } catch (err) {
                job["completedAt"] = new Date();
                job["status"] = "error";
                job["output"] = err;
                await job.save();
            }
             


            res.status(201).json({ success: true, jobId });
        })()
    } catch (err) {
        // return res.status(500).json(err);
        res.status(201).json({ name: "error aa gya ye to" });
    }



});
router.get("/status/:id", async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json("Missing required fields");
    }

    try {
        const job = await Job.findById(req.params.id);

        res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, success: false });
    }
});

module.exports = router;