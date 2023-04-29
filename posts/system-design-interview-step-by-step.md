---
title: "System Design Interview (BaBy)"
date: "2023-04-29"
image: system-design-interview-thumb.png
excerpt: Preparation and being organized during the interview are the keys to be successful in the SDIs.
isFeatured: true
---

# System Design Interview - BabySteps
System you are designing is like your baby at first place. You have to do susu and potty of that baby system through-out your work span.

A lot of engineers struggling with System design interviews (SDIs) primarily because of three reasons:

1. Un-structured nature of SDIs
2. Lack of experience
3. No proper preparation for SDIs

# Dont worry, Lets Gooooooooo 🎉

---
#### Step 1: Requirement Clarifications
Its always a good idea to ask questions about the exact scope of the problem you are solving. Candidates who spend enough time to define the end goals of the system always have a better chance to be successful in the interview.
Lets expand this with an actual example of designing a Twitter-like service. Here are some questions for designing twitter that should be answered before moving on to the next steps:

- Will users of the service be able to post tweets and follow other people?
- Should we also design to create and display the users timeline?
- Will tweets contain photos and videos?
- Are we focusing on the backend only or are we developing the front-end too?
- Will users be able to search tweets?
- Do we need to display hot trending topics?

All such questions will determine how our end design will look like.

---
#### Step 2: System Interface Definition

Define what APIs and proper contracts are expected from the system.
```javascript
postTweet (usr_id, twt_data, twt_location, usr_location, timestamp, ...)
generateTimeline (usr_id, current_time, user_loc, ...)
makeTweetFvrt (usr_id, twt_id, timestamp, ...)
```
---
#### Step 3: Back-of-the-envelope estimation
Its always a good idea to estimate the scale of the system we are going to design. This will help you focus on scaling, partitioning, load balancing and caching.

- What scale is expected from the system?
- How much storage will we need?
- What network bandwidth usage are we expecting?
---
#### Step 5: High Level Design
Draw a block diagram with 5-6 boxes representing the core components of our system.

![block diagram + core components](component-block-diagram.png)

---
#### Step 6: Detailed Design
Dig deeper into two or three components,  and wait for interviewers feedback, what parts of the system need further discussion.

Remember there is no single answer, the only important thing is to consider tradeoffs between different options while keeping system constraints in mind.

- How should we partition data?
- How will we handle hot users?
- At which layer should we introduce cache to speed things up?
- What component need better load balancing?

---
#### Step 7: Identify and Resolving the Bottlenecks
Try to discuss as many bottlenecks as possible and different approaches to mitigate them.

- Is there any single point of failure in the system?
- Do we have enough replicas of the data?
- Do we have enough copies of different services running?
- How are we monitoring the performance of our services? Plan alerts.

---

#### Summary:
> Preparation and being organized during the interview are the keys to be successful in the SDIs

