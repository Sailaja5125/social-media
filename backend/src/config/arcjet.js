import arcjet , { tokenBucket , shield , detectBot } from '@arcjet/node'
import { ENV } from "./env.js"

export const aj  =arcjet({
    key:ENV.ARCJET_KEY,
    characteristics:["ip.src"],
    rules:[
        // shiled protects our app from common attacks eg SQL Injection , XSS ,CSRF attacks
        shield({node : "LIVE"}),

        // bot detection
        detectBot({
            node: "LIVE",
            allow:{
                "CATEGORY":"SEARCH_ENGINE",
                // allow legitimate search engine bots
            }

        })
    ]
})