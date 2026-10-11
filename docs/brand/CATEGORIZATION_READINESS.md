# Website Categorization Readiness

Date: 2026-10-11. Local readiness work; no requests submitted.

**Deferred by owner:** corporate work-laptop access and the Miscellaneous/Unknown label are not priorities. Retain this report as background only; do not let missing vendor access block website review or continue investigating without a new request.

## Confirmed And Unconfirmed

The owner reports that Albertsons' work laptop blocks `amanchilabs.com` as **Miscellaneous or Unknown**. The responsible vendor, policy, and any custom classification are unknown. No reliable public evidence establishes which security product Albertsons uses for this particular block. A block-page vendor name, request ID, or IT/security-team confirmation remains an outstanding dependency, not a blocker for local website work.

No domain-specific category or malicious/benign security rating was independently confirmed for any of the four providers. Lookup access failures are not classification results. The public informational pages below were accessible; interactive/domain lookup attempts encountered CAPTCHA/access controls. Do not equate unknown content categories with malware reputation or assume a category change will override an employer policy.

| Provider | Domain result / access limitation | Recommended category | Official lookup / review route |
| --- | --- | --- | --- |
| Palo Alto Networks | Unconfirmed; interactive lookup encountered CAPTCHA validation. No category-change request submitted. | `computer-and-internet-info` (software/technology company), subject to vendor definitions | https://urlfiltering.paloaltonetworks.com/ ; search the URL, then **Request URL Category Change** below results. Login/CAPTCHA may apply. |
| Zscaler | Unconfirmed; Site Review reports customer-only access through Zscaler cloud. It also warns that custom admin categories can differ from public lookup. | Information Technology / software-development category closest to current taxonomy; confirm exact label in authorized interface | https://sitereview.zscaler.com/ ; authorized customer/admin performs URL lookup and available review process, or contacts Zscaler support. Do not bypass cloud-access restrictions. |
| Cisco Talos / Umbrella | Unconfirmed; domain lookup encountered an anti-bot challenge. Talos and Umbrella policy results must not be assumed identical. | Computers and Internet / software-development category closest to current taxonomy | https://talosintelligence.com/reputation_center ; category/support review through https://support.talosintelligence.com/ . Umbrella-specific review through the customer's Umbrella dashboard/support at https://support.umbrella.com/ . Account access may be required. |
| Fortinet FortiGuard | Unconfirmed; domain-specific lookup encountered a web application firewall block. | Information Technology, subject to current vendor category definitions | https://www.fortiguard.com/webfilter ; official categorization submission link https://www.fortiguard.com/faq/wfratingsubmit . Lookup page allows URL/category review and contact email. |

Recommendations are content-fit suggestions, not statements of current classification or guarantees of acceptance. The parent studio should not be classified as Finance or Health Care solely because those are application domains. Validate exact current taxonomy labels before submitting.

## Factual Review Draft

Use the following common description for each provider, selecting only its available accurate software/technology category:

> Amanchi Labs (https://amanchilabs.com/) is a software development and information technology studio. Its public company website describes its privacy-first design philosophy and personal applications, including WealthPrivate (in development) and DermaPrivate (skincare/personal routines). It provides company information and business/support email contacts. The parent company website is not a financial-services portal or healthcare provider. Please review its content category for the appropriate software/Information Technology classification.

For Palo Alto: request content-category review, not an IP-attribute change. For FortiGuard: supply the domain and closest Information Technology category. For Zscaler: have an authorized customer administrator check any custom category/policy before requesting database review. For Cisco: distinguish Talos content categorization, threat reputation, and Umbrella organization policy when opening the review. Do not claim a verified benign rating, regulated status, security certification, or product data guarantee.

## Website Readiness Changes

- Title and description identify a privacy-first software studio; canonical homepage and absolute Open Graph/Twitter image URLs are explicit.
- Organization structured data includes only supplied company name, website, logo, descriptive business identity, and existing email contacts. No fabricated address, founding date, credentials, or social profiles.
- Visible no-JavaScript company summary gives business context, products, and contacts without changing the React architecture or adding hidden keyword content. JS-capable crawlers still render the existing panels; complete panel prerendering is not implemented or promised.
- Local `robots.txt` permits crawling and points to `sitemap.xml`; sitemap lists canonical homepage and website privacy notice, not hash fragments (fragments are not distinct HTTP documents).
- Website-only privacy notice distinguishes hosting/font network requests and email from product personal-data flows. Hosting retention practices remain provider-controlled; no zero-network-data claim.
- New brand/favicon/social derivatives are available locally; only derivatives, not the 13 originals, enter the production public assets.

Live public checks earlier in this task found HTTP 200 over HTTPS, HTTP and `www` redirecting to the canonical domain, and `/robots.txt` and `/sitemap.xml` returning 404 before these local additions. Local changes are not live until separately authorized and deployed. Successful TLS validation establishes reachability, not corporate reputation. Validate again after an authorized deployment; vendor crawlers cannot inspect unpublished local metadata.

## Outstanding Actions

Obtain the Albertsons block-page vendor/policy information from the owner or authorized IT/security team. An authorized reviewer must complete any blocked CAPTCHA/login and capture each current category and review case ID. Requests, accounts, or third-party contact require explicit approval. Never bypass company controls. Recategorization may take time and does not guarantee corporate access. Separate publication approval remains required.