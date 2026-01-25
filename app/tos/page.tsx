'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default function TosPage() {
  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Hero Banner */}
      <section className="relative">
        <div className="h-48 md:h-64 lg:h-72 relative overflow-hidden">
          <div className="w-full h-full gradient-bg" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-[rgb(var(--bg)/0.5)] to-transparent" />
        </div>

        {/* Overlapping Card */}
        <div className="container-default relative -mt-20 md:-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] shadow-large p-6 md:p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[rgb(var(--accent)/0.1)] flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={['fas', 'file-contract'] as IconProp} className="text-3xl text-[rgb(var(--accent))]" />
              </div>
              <div className="flex-1">
                <h1 className="heading-2 text-[rgb(var(--text))] mb-2">Terms of Service</h1>
                <p className="body-default text-[rgb(var(--muted))]">
                  Last updated November 30, 2025
                </p>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-6 pt-6 border-t border-[rgb(var(--border))]">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors"
              >
                <FontAwesomeIcon icon={['fas', 'arrow-left'] as IconProp} />
                Back to home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-default py-8">
        <div className="max-w-4xl mx-auto">

          <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-8">
            <h2 className="heading-3 text-[rgb(var(--text))] mb-8">TERMS OF SERVICE</h2>

            <div className="bg-[rgb(var(--muted)/0.05)] border border-[rgb(var(--border))] rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-[rgb(var(--text))] mb-4">TABLE OF CONTENTS</h3>
              <ul className="list-none pl-0 space-y-2">
                <li><a href="#agreement" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:pl-2 transition-all no-underline">1. AGREEMENT TO TERMS</a></li>
                <li><a href="#services" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">2. OUR SERVICES</a></li>
                <li><a href="#ip" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">3. INTELLECTUAL PROPERTY RIGHTS</a></li>
                <li><a href="#userreps" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">4. USER REPRESENTATIONS</a></li>
                <li><a href="#prohibited" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">5. PROHIBITED ACTIVITIES</a></li>
                <li><a href="#ugc" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">6. USER GENERATED CONTRIBUTIONS</a></li>
                <li><a href="#license" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">7. CONTRIBUTION LICENSE</a></li>
                <li><a href="#reviews" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">8. GUIDELINES FOR REVIEWS</a></li>
                <li><a href="#thirdparty" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">9. THIRD-PARTY WEBSITES AND CONTENT</a></li>
                <li><a href="#management" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">10. SERVICES MANAGEMENT</a></li>
                <li><a href="#pp" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">11. PRIVACY POLICY</a></li>
                <li><a href="#terms" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">12. TERM AND TERMINATION</a></li>
                <li><a href="#modifications" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">13. MODIFICATIONS AND INTERRUPTIONS</a></li>
                <li><a href="#law" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">14. GOVERNING LAW</a></li>
                <li><a href="#disputes" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">15. DISPUTE RESOLUTION</a></li>
                <li><a href="#corrections" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">16. CORRECTIONS</a></li>
                <li><a href="#disclaimer" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">17. DISCLAIMER</a></li>
                <li><a href="#liability" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">18. LIMITATIONS OF LIABILITY</a></li>
                <li><a href="#indemnification" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">19. INDEMNIFICATION</a></li>
                <li><a href="#userdata" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">20. USER DATA</a></li>
                <li><a href="#electronic" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">21. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</a></li>
                <li><a href="#california" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">22. CALIFORNIA USERS AND RESIDENTS</a></li>
                <li><a href="#misc" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">23. MISCELLANEOUS</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-blue-500 hover:pl-2 transition-all no-underline">24. CONTACT US</a></li>
              </ul>
            </div>

            <h3 id="agreement" className="heading-4 text-[rgb(var(--text))] mt-12 mb-4 scroll-mt-24">1. AGREEMENT TO TERMS</h3>

            <p className="mb-5 leading-relaxed text-[rgb(var(--muted))]">
              We are <span className="font-semibold text-[rgb(var(--accent))]">FreeHosts</span> (&quot;<strong className="font-semibold text-[rgb(var(--text))]">Company</strong>&quot;, &quot;<strong className="font-semibold text-[rgb(var(--text))]">we</strong>&quot;, &quot;<strong className="font-semibold text-[rgb(var(--text))]">us</strong>&quot;, or &quot;<strong className="font-semibold text-[rgb(var(--text))]">our</strong>&quot;).
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              We operate the website <span className="font-semibold text-blue-500">freehosts.space</span> (the &quot;<strong className="font-semibold text-foreground">Site</strong>&quot;), as well as any other related products and services that refer or link to these legal terms (the &quot;<strong className="font-semibold text-foreground">Legal Terms</strong>&quot;) (collectively, the &quot;<strong className="font-semibold text-foreground">Services</strong>&quot;).
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              You can contact us by email at <a href="mailto:support@freehosts.space" className="text-blue-500 underline hover:text-indigo-500 transition-colors">support@freehosts.space</a>.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;<strong className="font-semibold text-foreground">you</strong>&quot;), and FreeHosts, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms at any time and for any reason. We will alert you about any changes by updating the &quot;Last updated&quot; date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              The Services are intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Services. If you are a minor, you must have your parent or guardian read and agree to these Legal Terms prior to you using the Services.
            </p>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="services" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">2. OUR SERVICES</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
            </p>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="ip" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">3. INTELLECTUAL PROPERTY RIGHTS</h2>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Our intellectual property</h3>

            <p className="mb-5 leading-relaxed text-foreground">
              We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &quot;Content&quot;), as well as the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;).
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              The Content and Marks are provided in or through the Services &quot;AS IS&quot; for your personal, non-commercial use or internal business purpose only.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Your use of our Services</h3>

            <p className="mb-5 leading-relaxed text-foreground">
              Subject to your compliance with these Legal Terms, including the &quot;<a href="#prohibited" className="text-blue-500 underline hover:text-indigo-500 transition-colors">PROHIBITED ACTIVITIES</a>&quot; section below, we grant you a non-exclusive, non-transferable, revocable license to:
            </p>

            <ul className="list-disc pl-8 space-y-2 mb-5 text-foreground">
              <li>access the Services; and</li>
              <li>download or print a copy of any portion of the Content to which you have properly gained access.</li>
            </ul>

            <p className="mb-5 leading-relaxed text-foreground">
              solely for your personal, non-commercial use or internal business purpose.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: <a href="mailto:support@freehosts.space" className="text-blue-500 underline hover:text-indigo-500 transition-colors">support@freehosts.space</a>. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Your submissions</h3>

            <p className="mb-5 leading-relaxed text-foreground">
              Please review this section and the &quot;<a href="#prohibited" className="text-blue-500 underline hover:text-indigo-500 transition-colors">PROHIBITED ACTIVITIES</a>&quot; section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              <strong className="text-blue-500 font-semibold">Submissions:</strong> By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services (&quot;Submissions&quot;), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              <strong className="text-blue-500 font-semibold">You are responsible for what you post or upload:</strong> By sending us Submissions through any part of the Services you:
            </p>

            <ul className="list-disc pl-8 space-y-2 mb-5 text-foreground">
              <li>confirm that you have read and agree with our &quot;<a href="#prohibited" className="text-blue-500 underline hover:text-indigo-500 transition-colors">PROHIBITED ACTIVITIES</a>&quot; and will not post, send, publish, upload, or transmit through the Services any Submission that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;</li>
              <li>to the extent permissible by applicable law, waive any and all moral rights to any such Submission;</li>
              <li>warrant that any such Submission are original to you or that you have the necessary rights and licenses to submit such Submissions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions; and</li>
              <li>warrant and represent that your Submissions do not constitute confidential information.</li>
            </ul>

            <p className="mb-5 leading-relaxed text-foreground">
              You are solely responsible for your Submissions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party&apos;s intellectual property rights, or (c) applicable law.
            </p>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="userreps" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">4. USER REPRESENTATIONS</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              By using the Services, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Legal Terms; (2) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services; (3) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Services for any illegal or unauthorized purpose; and (5) your use of the Services will not violate any applicable law or regulation.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
            </p>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="prohibited" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">5. PROHIBITED ACTIVITIES</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              As a user of the Services, you agree not to:
            </p>

            <ul className="list-disc pl-8 space-y-2 mb-5 text-foreground">
              <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
              <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.</li>
              <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
              <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
              <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
              <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
              <li>Engage in unauthorized framing of or linking to the Services.</li>
              <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party&apos;s uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.</li>
              <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
              <li>Delete the copyright or other proprietary rights notice from any Content.</li>
              <li>Attempt to impersonate another user or person or use the username of another user.</li>
              <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (&quot;gifs&quot;), 1x1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as &quot;spyware&quot; or &quot;passive collection mechanisms&quot; or &quot;pcms&quot;).</li>
              <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
              <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</li>
              <li>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.</li>
              <li>Copy or adapt the Services&apos; software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
              <li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
              <li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorized script or other software.</li>
              <li>Use a buying agent or purchasing agent to make purchases on the Services.</li>
              <li>Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
              <li>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
            </ul>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="ugc" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">6. USER GENERATED CONTRIBUTIONS</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              The Services does not offer users to submit or post content. We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, &quot;Contributions&quot;). Contributions may be viewable by other users of the Services and through third-party websites. When you create or make available any Contributions, you thereby represent and warrant that:
            </p>

            <ul className="list-disc pl-8 space-y-2 mb-5 text-foreground">
              <li>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.</li>
              <li>You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms.</li>
            </ul>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="contact" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">24. CONTACT US</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
            </p>

            <div className="bg-card border-l-4 border-blue-500 p-6 my-8 rounded-r-xl shadow-sm">
              <p className="mb-0 text-foreground">
                <strong className="text-blue-500 font-semibold mb-2 block">FreeHosts</strong>
                <a href="mailto:support@freehosts.space" className="text-blue-500 underline hover:text-indigo-500 transition-colors">support@freehosts.space</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
