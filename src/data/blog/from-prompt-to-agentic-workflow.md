---
author: James Mensch
pubDatetime: 2026-09-27T16:00:00Z
title: Build your agentic workflow around the work the prompt leaves behind
featured: false
draft: false
tags:
  - ai-tools
  - agents
  - automation
description: "Turning a prompt into an agentic workflow starts with the work people still do around it. Here's how we found and removed those handoffs."
---

Our AI extraction prompt could turn a restaurant menu into database records, but I was still spending about an hour a day getting the results into our product. If you're turning a useful prompt into an agentic workflow, that remaining manual work is where I'd start. Following the handoffs around our prompt showed us what to automate next.

Someone found the menu, opened ChatGPT, supplied our shared prompt, and handed me the SQL it produced. I corrected it and imported it. The model had taken over a useful part of the work, but a person still had to carry each result into the next step.

## Watch what people do between model calls

At OneOnMe, people send gifts at local venues. When someone searched for a place we didn't have, the experience could end there. We needed broader venue coverage, and preparing menus was limiting how quickly we could add it.

We started with manual data entry. The shared prompt was an improvement because a model could interpret different menu layouts and produce records in a format we could import. An employee still spent roughly 20 hours a week preparing those files, though, and I spent another hour a day correcting and importing them.

Those are operating estimates, but they describe the work well enough to expose the next bottleneck. We had improved extraction while leaving the surrounding process largely intact:

```text
Find a source
  -> give the model its instructions
  -> move its output to the next system
  -> correct the result
  -> make it available to customers
```

For an invoice workflow, the equivalent might be finding the attachment, matching it to a supplier, and entering the result into an accounting system. For customer support, it might be assembling account history before drafting a response. In each case, the useful question is what someone must still do for the model's answer to become usable work.

## Expand one responsibility at a time

I first automated the step we already understood. A remote agent took a menu URL, extracted the data, and handed its output to the rest of the pipeline. A person still selected the source, which kept the new responsibility narrow enough to inspect.

Then I moved the starting point upstream. The workflow accepted target cities and venue criteria, found suitable places and their menu URLs, and continued into extraction. The progression looked like this:

| Starting point                 | Work delegated to the system      | Human responsibility                 |
| ------------------------------ | --------------------------------- | ------------------------------------ |
| A menu and an admin form       | None                              | Enter the records                    |
| A menu URL and a shared prompt | Prepare SQL                       | Operate chat, correct and import SQL |
| A menu URL                     | Extract and hand off the data     | Find the source and review results   |
| Cities and venue criteria      | Discover sources and process them | Set criteria and review exceptions   |

The remote extractor removed the repeated chat-and-file handoff. Adding discovery meant a person no longer had to find every input, but it also introduced decisions that depended on what the agent found.

For example, our discovery instructions ask the agent to inspect a venue's website for a menu. It may follow an embedded ordering link, or request a rendered page when a plain fetch doesn't expose the menu. The model interprets the returned content and chooses the next useful action. The surrounding script loops through cities and enforces timeouts, because those parts don't need model judgment.

That's the distinction I find useful in Anthropic's [description of workflows and agents](https://www.anthropic.com/engineering/building-effective-agents). A fixed sequence can contain a step where the model chooses how to proceed. You can automate one stubborn handoff without giving a model control over the whole process.

## Make the handoff explicit

Passing text to another model is easy. Defining what the next step is allowed to assume takes more care.

In our discovery implementation, an extraction record carries the source URL and extraction version alongside the database records it produced. That gives the next person investigating an item somewhere to start. A bare list of extracted names and prices would lose that connection.

Publication also needs an explicit decision. Our process began with human review of all extracted output and eventually allowed passing items through automatically, while questionable output stayed staged. The destination shouldn't have to guess whether a result is ready.

For a document workflow, I'd define the equivalent handoff like this:

| Question                      | Example for document extraction                         |
| ----------------------------- | ------------------------------------------------------- |
| What arrives?                 | A source document and the proposed records              |
| What must be true?            | Required fields are present and traceable to the source |
| What happens on uncertainty?  | Hold the result for review                              |
| What action becomes possible? | Write an approved record into the destination system    |

## Keep the business criteria close to the workflow

The model also needed to understand what we wanted to collect. A correctly extracted item could still be unsuitable for the product.

I built the pipeline and initial prompts. Rachel, my cofounder, refined the venue and item-selection criteria. That knowledge belonged in the workflow because someone would otherwise have to apply it again during review.

In a different business, the equivalent could be the definition of a qualified lead or the conditions under which a support request should be escalated. I've [written about making that knowledge available across a company](/writing/company-ai-infrastructure/). An automated workflow needs it too, because getting the data out of the source only completes part of the task.

## Count the work that remains

The agents eventually took over the routine menu preparation that had occupied roughly 20 employee hours a week. My own correction and import work fell from about an hour a day to a few minutes reviewing exceptions, sometimes none. Those estimates cover a known menu URL through insertion, excluding discovery time.

They don't establish an accuracy rate or an all-in cost saving. For a stronger evaluation, I'd measure usable output and the human work it requires over comparable batches. Anthropic's [agent evaluation guide](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) makes a related distinction between what an agent says it did and the outcome it actually leaves behind.

The change I could see was in my own day. I no longer had to move every successful extraction through the system. The workflow could carry routine results forward, and my attention went to the cases it couldn't settle.
