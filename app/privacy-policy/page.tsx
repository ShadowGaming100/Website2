'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default function PrivacyPolicyPage() {
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
                <FontAwesomeIcon icon={['fas', 'shield-halved'] as IconProp} className="text-3xl text-[rgb(var(--accent))]" />
              </div>
              <div className="flex-1">
                <h1 className="heading-2 text-[rgb(var(--text))] mb-2">Privacy Policy</h1>
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
            <h2 className="heading-3 text-[rgb(var(--text))] mb-8">PRIVACY POLICY</h2>


            <div className="bg-[rgb(var(--muted)/0.05)] border border-[rgb(var(--border))] rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-[rgb(var(--text))] mb-4">TABLE OF CONTENTS</h3>
              <ul className="list-none pl-0 space-y-2">
                <li><a href="#summary" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:pl-2 transition-all no-underline">SUMMARY OF KEY POINTS</a></li>
                <li><a href="#infocollect" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:pl-2 transition-all no-underline">1. WHAT INFORMATION DO WE COLLECT?</a></li>
                <li><a href="#infouse" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:pl-2 transition-all no-underline">2. HOW DO WE PROCESS YOUR INFORMATION?</a></li>
                <li><a href="#legalbases" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:pl-2 transition-all no-underline">3. WHAT LEGAL BASES DO WE RELY ON?</a></li>
                <li><a href="#whoshare" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:pl-2 transition-all no-underline">4. WHEN AND WITH WHOM DO WE SHARE YOUR INFORMATION?</a></li>
                <li><a href="#cookies" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:pl-2 transition-all no-underline">5. DO WE USE COOKIES AND TRACKING TECHNOLOGIES?</a></li>
                <li><a href="#inforetain" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:pl-2 transition-all no-underline">6. HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
                <li><a href="#infosafe" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:pl-2 transition-all no-underline">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
                <li><a href="#privacyrights" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:pl-2 transition-all no-underline">8. WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
                <li><a href="#DNT" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:pl-2 transition-all no-underline">9. CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
                <li><a href="#uslaws" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:pl-2 transition-all no-underline">10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
                <li><a href="#policyupdates" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:pl-2 transition-all no-underline">11. DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
                <li><a href="#contact" className="text-[rgb(var(--muted))] hover:text-[rgb(var(--accent))] hover:pl-2 transition-all no-underline">12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
              </ul>
            </div>

            <h3 id="summary" className="heading-4 text-[rgb(var(--text))] mt-12 mb-4 scroll-mt-24">SUMMARY OF KEY POINTS</h3>

            <p className="mb-5 leading-relaxed text-[rgb(var(--muted))]">
              <em className="italic">This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</em>
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              <strong className="text-blue-500 font-semibold">What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              <strong className="text-blue-500 font-semibold">Do we process any sensitive personal information?</strong> We do not process sensitive personal information.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              <strong className="text-blue-500 font-semibold">Do we collect any information from third parties?</strong> We do not collect any information from third parties.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              <strong className="text-blue-500 font-semibold">How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              <strong className="text-blue-500 font-semibold">In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              <strong className="text-blue-500 font-semibold">How do we keep your information safe?</strong> We have organizational and technical processes and procedures in place to protect your personal information.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              <strong className="text-blue-500 font-semibold">What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.
            </p>

            <div className="bg-card border-l-4 border-blue-500 p-6 my-8 rounded-r-xl">
              <p className="leading-relaxed m-0 text-foreground">
                <strong className="text-blue-500 font-semibold">Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:support@freehosts.space" className="text-blue-500 underline hover:text-indigo-500 transition-colors">support@freehosts.space</a>.
              </p>
            </div>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="infocollect" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">1. WHAT INFORMATION DO WE COLLECT?</h2>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Personal information you disclose to us</h3>

            <p className="mb-5 leading-relaxed text-foreground">
              <em className="italic">In Short:</em> We collect personal information that you provide to us.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              <strong className="text-blue-500 font-semibold">Sensitive Information.</strong> We do not process sensitive information.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Information automatically collected</h3>

            <p className="mb-5 leading-relaxed text-foreground">
              <em className="italic">In Short:</em> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              Like many businesses, we also collect information through cookies and similar technologies. You can find out more about this in our Cookie Notice: <span className="font-semibold text-indigo-500">freehosts.space/cookies</span>.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">The information we collect includes:</p>

            <ul className="list-disc pl-8 space-y-2 mb-5 text-foreground">
              <li><strong className="text-blue-500 font-semibold">Log and Usage Data.</strong> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files.</li>
              <li><strong className="text-blue-500 font-semibold">Device Data.</strong> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services.</li>
              <li><strong className="text-blue-500 font-semibold">Location Data.</strong> We collect location data such as information about your device&apos;s location, which can be either precise or imprecise.</li>
            </ul>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="infouse" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              <em className="italic">In Short:</em> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes only with your prior explicit consent.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              <strong className="text-blue-500 font-semibold">We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong>
            </p>

            <ul className="list-disc pl-8 space-y-2 mb-5 text-foreground">
              <li><strong className="text-blue-500 font-semibold">To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.</li>
              <li><strong className="text-blue-500 font-semibold">To respond to user inquiries/offer support to users.</strong> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
              <li><strong className="text-blue-500 font-semibold">To protect our Services.</strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
              <li><strong className="text-blue-500 font-semibold">To identify usage trends.</strong> We may process information about how you use our Services to better understand how they are being used so we can improve them.</li>
              <li><strong className="text-blue-500 font-semibold">To save or protect an individual&apos;s vital interest.</strong> We may process your information when necessary to save or protect an individual&apos;s vital interest, such as to prevent harm.</li>
            </ul>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="legalbases" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              <em className="italic">In Short:</em> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">If you are located in the EU or UK, this section applies to you.</h3>

            <p className="mb-5 leading-relaxed text-foreground">
              The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:
            </p>

            <ul className="list-disc pl-8 space-y-2 mb-5 text-foreground">
              <li><strong className="text-blue-500 font-semibold">Consent.</strong> We may process your information if you have given us permission to use your personal information for a specific purpose.</li>
              <li><strong className="text-blue-500 font-semibold">Legitimate Interests.</strong> We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests.</li>
              <li><strong className="text-blue-500 font-semibold">Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations.</li>
              <li><strong className="text-blue-500 font-semibold">Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">If you are located in Canada, this section applies to you.</h3>

            <p className="mb-5 leading-relaxed text-foreground">
              We may process your information if you have given us specific permission to use your personal information for a specific purpose, or in situations where your permission can be inferred.
            </p>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="whoshare" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              <em className="italic">In Short:</em> We may share information in specific situations described in this section and/or with the following third parties.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              <strong className="text-blue-500 font-semibold">Vendors, Consultants, and Other Third-Party Service Providers.</strong> We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. We have contracts in place with our third parties, which are designed to help safeguard your personal information.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              The third parties we may share personal information with are as follows:
            </p>

            <ul className="list-disc pl-8 space-y-2 mb-5 text-foreground">
              <li><strong className="text-blue-500 font-semibold">Web and Mobile Analytics:</strong> Google Analytics and Matomo</li>
              <li><strong className="text-blue-500 font-semibold">Website Performance Monitoring:</strong> Matomo</li>
            </ul>

            <p className="mb-5 leading-relaxed text-foreground">
              We may also need to share your personal information in the following situations:
            </p>

            <ul className="list-disc pl-8 space-y-2 mb-5 text-foreground">
              <li><strong className="text-blue-500 font-semibold">Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            </ul>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="cookies" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              <em className="italic">In Short:</em> We may use cookies and other tracking technologies to collect and store your information.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice: <span className="font-semibold text-indigo-500">freehosts.space/cookies</span>.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Google Analytics</h3>

            <p className="mb-5 leading-relaxed text-foreground">
              We may share your information with Google Analytics to track and analyze the use of the Services. To opt out of being tracked by Google Analytics across the Services, visit <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-500 underline hover:text-indigo-500 transition-colors">https://tools.google.com/dlpage/gaoptout</a>. For more information on the privacy practices of Google, please visit the <a href="https://policies.google.com/privacy" className="text-blue-500 underline hover:text-indigo-500 transition-colors">Google Privacy & Terms page</a>.
            </p>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="inforetain" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              <em className="italic">In Short:</em> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law. No purpose in this notice will require us keeping your personal information for longer than 1 year.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information.
            </p>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="infosafe" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              <em className="italic">In Short:</em> We aim to protect your personal information through a system of organizational and technical security measures.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
            </p>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="privacyrights" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">8. WHAT ARE YOUR PRIVACY RIGHTS?</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              <em className="italic">In Short:</em> Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              You can make such a request by contacting us by using the contact details provided in the section &quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot; below.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              We will consider and act upon any request in accordance with applicable data protection laws.
            </p>

            <div className="bg-card border-l-4 border-blue-500 p-6 my-8 rounded-r-xl">
              <p className="leading-relaxed m-0 text-foreground">
                <strong className="text-blue-500 font-semibold">Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section &quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot; below.
              </p>
            </div>

            <p className="mb-5 leading-relaxed text-foreground">
              <strong className="text-blue-500 font-semibold">Cookies and similar technologies:</strong> Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              If you have questions or comments about your privacy rights, you may email us at <a href="mailto:support@freehosts.space" className="text-blue-500 underline hover:text-indigo-500 transition-colors">support@freehosts.space</a>.
            </p>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="DNT" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">9. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (&apos;DNT&apos;) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.
            </p>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="uslaws" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              <em className="italic">In Short:</em> If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Categories of Personal Information We Collect</h3>

            <p className="mb-5 leading-relaxed text-foreground">
              The table below shows the categories of personal information we have collected in the past twelve (12) months.
            </p>

            <div className="overflow-x-auto mb-8 rounded-xl shadow-sm border border-border">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-900/10">
                    <th className="p-4 text-left border-b border-border font-semibold text-foreground">Category</th>
                    <th className="p-4 text-left border-b border-border font-semibold text-foreground">Examples</th>
                    <th className="p-4 text-left border-b border-border font-semibold text-foreground">Collected</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border-b border-border text-foreground">A. Identifiers</td>
                    <td className="p-4 border-b border-border text-foreground">Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td>
                    <td className="p-4 border-b border-border text-foreground">NO</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b border-border text-foreground">F. Internet or other similar network activity</td>
                    <td className="p-4 border-b border-border text-foreground">Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements</td>
                    <td className="p-4 border-b border-border text-foreground">YES</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-foreground">G. Geolocation data</td>
                    <td className="p-4 text-foreground">Device location</td>
                    <td className="p-4 text-foreground">YES</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Your Rights</h3>

            <p className="mb-5 leading-relaxed text-foreground">
              You have rights under certain US state data protection laws. These rights include:
            </p>

            <ul className="list-disc pl-8 space-y-2 mb-5 text-foreground">
              <li>Right to know whether or not we are processing your personal data</li>
              <li>Right to access your personal data</li>
            </ul>

            <p className="mb-5 leading-relaxed text-foreground">
              <strong className="text-blue-500 font-semibold">Note:</strong> Due to the nature of the analytics data we collect (which is anonymized and aggregated), we are unable to provide individual data correction, deletion, or data portability for this information. We do not use personal data for targeted advertising purposes.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">How to Exercise Your Rights</h3>

            <p className="mb-5 leading-relaxed text-foreground">
              To exercise these rights, you can contact us by emailing us at <a href="mailto:support@freehosts.space" className="text-blue-500 underline hover:text-indigo-500 transition-colors">support@freehosts.space</a>, or by referring to the contact details at the bottom of this document.
            </p>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="policyupdates" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">11. DO WE MAKE UPDATES TO THIS NOTICE?</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              <em className="italic">In Short:</em> Yes, we will update this notice as necessary to stay compliant with relevant laws.
            </p>

            <p className="mb-5 leading-relaxed text-foreground">
              We may update this Privacy Notice from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
            </p>

            <hr className="h-px bg-border my-12 border-0" />

            <h2 id="contact" className="text-2xl font-semibold mt-12 mb-4 text-foreground scroll-mt-24">12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>

            <p className="mb-5 leading-relaxed text-foreground">
              If you have questions or comments about this notice, you may email us at <a href="mailto:support@freehosts.space" className="text-blue-500 underline hover:text-indigo-500 transition-colors">support@freehosts.space</a>.
            </p>

            <div className="bg-card border-l-4 border-blue-500 p-6 my-8 rounded-r-xl shadow-sm">
              <p className="mb-0 text-foreground">
                <strong className="text-blue-500 font-semibold mb-2 block">FreeHosts</strong>
                Privacy Team<br />
                <a href="mailto:support@freehosts.space" className="text-blue-500 underline hover:text-indigo-500 transition-colors">support@freehosts.space</a>
              </p>
            </div>

            <p className="text-center text-muted-foreground mt-12">
              This privacy policy was last updated on November 30, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
