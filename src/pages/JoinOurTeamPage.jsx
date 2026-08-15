// src/pages/JoinOurTeamPage.jsx

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import jobsApi from "../api/jobsApi";
import { api } from "../api/apiClient";

import {
  ThaiPaperBackground,
  Section,
  OrnamentalDivider,
} from "../components/layout/Sections";

import SiteHeader from "../components/SiteHeader";
import ScrollToTopButton from "../components/ScrollToTopButton";

const SITE_URL =
  "https://the-mea-thai-cuisine.com";

const BUSINESS_NAME =
  "The Mea Thai Cuisine";

const DEFAULT_ORDER_LINK =
  "https://polite-mud-02f9f1a0f.6.azurestaticapps.net";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContactMethod: "Email",
  availableStartDate: "",
  availability: "",
  currentEmployer: "",
  currentPosition: "",
  yearsExperience: "",
  aboutYourself: "",
  whyWorkHere: "",
  additionalComments: "",
  resume: null,

  // Honeypot - humans never see this.
  website: "",
};

function JoinOurTeamPage() {
  const applicationRef = useRef(null);

  // =====================================================
  // HEADER / SITE STATE
  // =====================================================

  const [orderLink, setOrderLink] =
    useState(DEFAULT_ORDER_LINK);

  const [
    isOrderingEnabled,
    setIsOrderingEnabled,
  ] = useState(true);

  const [
    mobileNavOpen,
    setMobileNavOpen,
  ] = useState(false);

  const [
    showScrollTop,
    setShowScrollTop,
  ] = useState(false);

  // =====================================================
  // JOB STATE
  // =====================================================

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [loadError, setLoadError] =
    useState("");

  const [
    selectedJob,
    setSelectedJob,
  ] = useState(null);

  // =====================================================
  // APPLICATION STATE
  // =====================================================

  const [form, setForm] =
    useState(EMPTY_FORM);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  // =====================================================
  // LOAD PAGE DATA
  // =====================================================

  useEffect(() => {
    loadJobs();
    loadSiteSettings();

    const handleScroll = () => {
      setShowScrollTop(
        window.scrollY > 300
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    setLoadError("");

    try {
      const data =
        await jobsApi.getActiveJobs();

      setJobs(data);
    } catch (err) {
      console.error(
        "Failed to load job postings:",
        err
      );

      setLoadError(
        "We couldn't load our current openings right now. Please check back soon."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadSiteSettings =
    async () => {
      try {
        const [flagResult, linkResult] =
          await Promise.allSettled([
            api.get(
              "/TCVariable/value/Mea-Online-Ordering-Website-On-Off",
              {
                params: {
                  name:
                    "Mea-Online-Ordering-Website-On-Off",
                },
              }
            ),

            api.get(
              "/TCVariable/link"
            ),
          ]);

        if (
          flagResult.status ===
          "fulfilled"
        ) {
          const rawValue =
            flagResult.value.data
              ?.toString()
              .trim()
              .toLowerCase();

          const isOff =
            rawValue === "off" ||
            rawValue === "0" ||
            rawValue === "false";

          setIsOrderingEnabled(
            !isOff
          );
        }

        if (
          linkResult.status ===
          "fulfilled" &&
          linkResult.value.data
        ) {
          setOrderLink(
            linkResult.value.data
          );
        }
      } catch (err) {
        console.error(
          "Failed loading site settings:",
          err
        );
      }
    };

  // =====================================================
  // SEO
  // =====================================================

  const jobSchema = useMemo(() => {
    return jobs.map((job) => {
      const schema = {
        "@context":
          "https://schema.org",

        "@type":
          "JobPosting",

        title:
          job.title,

        description:
          job.description ||
          job.shortDescription ||
          "",

        datePosted:
          job.postedDateUtc,

        employmentType:
          mapEmploymentType(
            job.employmentType
          ),

        hiringOrganization: {
          "@type":
            "Organization",

          name:
            BUSINESS_NAME,

          sameAs:
            SITE_URL,

          logo:
            "https://rmrstorage.blob.core.windows.net/measite/MeaLogoBlackTrans.png",
        },

        jobLocation: {
          "@type":
            "Place",

          address: {
            "@type":
              "PostalAddress",

            streetAddress:
              "39 Court St",

            addressLocality:
              "Plymouth",

            addressRegion:
              "MA",

            postalCode:
              "02360",

            addressCountry:
              "US",
          },
        },
      };

      if (job.closingDateUtc) {
        schema.validThrough =
          job.closingDateUtc;
      }

      return schema;
    });
  }, [jobs]);

  // =====================================================
  // JOB SELECTION
  // =====================================================

  const selectJob = (job) => {
    setSelectedJob(job);

    setSubmitted(false);
    setSubmitError("");

    setForm(EMPTY_FORM);

    window.setTimeout(() => {
      applicationRef.current
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  const changeJob = () => {
    setSelectedJob(null);
    setSubmitted(false);
    setSubmitError("");

    window.setTimeout(() => {
      document
        .getElementById(
          "current-openings"
        )
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 50);
  };

  // =====================================================
  // FORM
  // =====================================================

  const updateField =
    (field, value) => {
      setForm((current) => ({
        ...current,
        [field]: value,
      }));
    };

  const handleResumeChange =
    (event) => {
      setSubmitError("");

      const file =
        event.target.files?.[0] ||
        null;

      if (!file) {
        updateField(
          "resume",
          null
        );

        return;
      }

      const extension =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase();

      const allowed =
        ["pdf", "doc", "docx"];

      if (
        !allowed.includes(extension)
      ) {
        event.target.value = "";

        setSubmitError(
          "Resume must be a PDF, DOC, or DOCX file."
        );

        return;
      }

      const maxSize =
        5 * 1024 * 1024;

      if (
        file.size > maxSize
      ) {
        event.target.value = "";

        setSubmitError(
          "Resume cannot be larger than 5 MB."
        );

        return;
      }

      updateField(
        "resume",
        file
      );
    };

  const submitApplication =
    async (event) => {
      event.preventDefault();

      if (!selectedJob) {
        return;
      }

      setSubmitting(true);
      setSubmitError("");

      try {
        await jobsApi
          .submitApplication(
            selectedJob.jobPostingId,
            form
          );

        setSubmitted(true);

        setForm(EMPTY_FORM);

        window.setTimeout(() => {
          applicationRef.current
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }, 100);
      } catch (err) {
        const message =
          getApiErrorMessage(err);

        setSubmitError(message);
      } finally {
        setSubmitting(false);
      }
    };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <ThaiPaperBackground>
      <Helmet>
        <title>
          Join Our Team | Jobs at The
          Mea Thai Cuisine | Plymouth,
          MA
        </title>

        <meta
          name="description"
          content="View current job openings at The Mea Thai Cuisine in Plymouth, Massachusetts. Apply online for restaurant, kitchen, server, food trailer, and other hospitality positions."
        />

        <link
          rel="canonical"
          href={`${SITE_URL}/join-our-team`}
        />

        <meta
          property="og:title"
          content="Join Our Team | The Mea Thai Cuisine"
        />

        <meta
          property="og:description"
          content="See current openings and apply online to join The Mea Thai Cuisine team in Plymouth, MA."
        />

        <meta
          property="og:url"
          content={`${SITE_URL}/join-our-team`}
        />

        {jobSchema.map(
          (schema, index) => (
            <script
              key={
                schema.title ||
                index
              }
              type="application/ld+json"
            >
              {JSON.stringify(
                schema
              )}
            </script>
          )
        )}
      </Helmet>

      <SiteHeader
        orderLink={orderLink}
        isOrderingEnabled={
          isOrderingEnabled
        }
        mobileNavOpen={
          mobileNavOpen
        }
        setMobileNavOpen={
          setMobileNavOpen
        }
      />

      {/* ==========================================
          HERO
      ========================================== */}

      <Section tone="warm">
        <div
          className="
            max-w-5xl
            mx-auto
            py-10
            md:py-16
            text-center
          "
        >
          <div
            className="
              inline-flex
              items-center
              rounded-full
              bg-red-50
              border
              border-red-100
              px-4
              py-2
              text-sm
              font-semibold
              text-red-700
              mb-5
            "
          >
            Careers at The Mea
          </div>

          <h1
            className="
              text-4xl
              md:text-6xl
              font-bold
              tracking-tight
              text-gray-900
              mb-5
            "
          >
            Join Our Team
          </h1>

          <p
            className="
              max-w-3xl
              mx-auto
              text-lg
              md:text-xl
              leading-relaxed
              text-gray-700
            "
          >
            Great Thai food starts
            with great people. We're
            looking for dependable,
            friendly team members who
            care about good food,
            helping customers, and
            working together.
          </p>

          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-3
              mt-8
            "
          >
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById(
                    "current-openings"
                  )
                  ?.scrollIntoView({
                    behavior:
                      "smooth",
                  });
              }}
              className="
                rounded-full
                bg-red-600
                text-white
                font-bold
                px-7
                py-3
                shadow-sm
                hover:bg-red-700
                transition
              "
            >
              View Open Positions
            </button>

            <Link
              to="/"
              className="
                rounded-full
                bg-white
                border
                border-gray-300
                text-gray-800
                font-semibold
                px-7
                py-3
                hover:bg-gray-50
                transition
              "
            >
              Back to Restaurant
            </Link>
          </div>
        </div>
      </Section>

      {/* ==========================================
          WHY WORK HERE
      ========================================== */}

      <Section tone="light">
        <div
          className="
            max-w-5xl
            mx-auto
          "
        >
          <div
            className="
              grid
              md:grid-cols-3
              gap-5
            "
          >
            <BenefitCard
              title="Be Part of the Team"
              text="Work with a small, local team where everyone plays an important role."
            />

            <BenefitCard
              title="Learn & Grow"
              text="Build restaurant, customer service, kitchen, and hospitality experience."
            />

            <BenefitCard
              title="Local Restaurant"
              text="Work in the heart of downtown Plymouth with a family-owned restaurant."
            />
          </div>
        </div>
      </Section>

      <OrnamentalDivider />

      {/* ==========================================
          OPEN JOBS
      ========================================== */}

      <Section
        tone="warm"
        id="current-openings"
      >
        <div
          className="
            max-w-5xl
            mx-auto
          "
        >
          <div className="mb-8">
            <p
              className="
                text-sm
                uppercase
                tracking-[0.18em]
                font-semibold
                text-red-700
                mb-2
              "
            >
              Careers
            </p>

            <h2
              className="
                text-3xl
                md:text-4xl
                font-bold
                text-gray-900
                mb-3
              "
            >
              Current Openings
            </h2>

            <p
              className="
                text-gray-600
                max-w-2xl
              "
            >
              Select a position below
              to learn more and apply
              online.
            </p>
          </div>

          {loading && (
            <JobLoading />
          )}

          {!loading &&
            loadError && (
              <div
                className="
                  rounded-2xl
                  bg-red-50
                  border
                  border-red-200
                  p-6
                  text-red-800
                "
              >
                {loadError}

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={
                      loadJobs
                    }
                    className="
                      font-semibold
                      underline
                    "
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

          {!loading &&
            !loadError &&
            jobs.length === 0 && (
              <NoJobs />
            )}

          {!loading &&
            !loadError &&
            jobs.length > 0 && (
              <div className="space-y-5">
                {jobs.map(
                  (job) => (
                    <JobCard
                      key={
                        job.jobPostingId
                      }
                      job={job}
                      selected={
                        selectedJob
                          ?.jobPostingId ===
                        job.jobPostingId
                      }
                      onApply={() =>
                        selectJob(
                          job
                        )
                      }
                    />
                  )
                )}
              </div>
            )}
        </div>
      </Section>

      {/* ==========================================
          SELECTED JOB / APPLICATION
      ========================================== */}

      {selectedJob && (
        <>
          <OrnamentalDivider />

          <Section tone="light">
            <div
              ref={applicationRef}
              id="job-application"
              className="
                max-w-5xl
                mx-auto
                scroll-mt-24
              "
            >
              <JobDetail
                job={selectedJob}
                onChangeJob={
                  changeJob
                }
              />

              <div className="mt-8">
                {submitted ? (
                  <ApplicationSuccess
                    job={
                      selectedJob
                    }
                    onAnother={() => {
                      setSubmitted(
                        false
                      );

                      setForm(
                        EMPTY_FORM
                      );
                    }}
                  />
                ) : (
                  <ApplicationForm
                    form={form}
                    job={
                      selectedJob
                    }
                    submitting={
                      submitting
                    }
                    error={
                      submitError
                    }
                    onUpdate={
                      updateField
                    }
                    onResumeChange={
                      handleResumeChange
                    }
                    onSubmit={
                      submitApplication
                    }
                  />
                )}
              </div>
            </div>
          </Section>
        </>
      )}

      {/* ==========================================
          GENERAL CTA
      ========================================== */}

      <Section tone="warm">
        <div
          className="
            max-w-4xl
            mx-auto
            rounded-3xl
            bg-white/80
            backdrop-blur-sm
            shadow-sm
            p-7
            md:p-10
            text-center
          "
        >
          <h2
            className="
              text-2xl
              md:text-3xl
              font-bold
              mb-3
            "
          >
            Don't See the Right
            Position?
          </h2>

          <p
            className="
              text-gray-700
              max-w-2xl
              mx-auto
            "
          >
            Check back again. Our
            available positions will
            automatically appear here
            whenever we're hiring.
          </p>
        </div>
      </Section>

      <ScrollToTopButton
        show={showScrollTop}
      />
    </ThaiPaperBackground>
  );
}

// =========================================================
// JOB CARD
// =========================================================

function JobCard({
  job,
  onApply,
  selected,
}) {
  return (
    <article
      className={`
        rounded-3xl
        bg-white/85
        backdrop-blur-sm
        border
        shadow-sm
        p-6
        md:p-8
        transition
        ${
          selected
            ? "border-red-300 ring-2 ring-red-100"
            : "border-gray-100 hover:shadow-md"
        }
      `}
    >
      <div
        className="
          md:flex
          md:items-start
          md:justify-between
          gap-8
        "
      >
        <div className="min-w-0">
          <div
            className="
              flex
              flex-wrap
              gap-2
              mb-3
            "
          >
            {job.employmentType && (
              <JobBadge>
                {
                  job.employmentType
                }
              </JobBadge>
            )}

            {job.location && (
              <JobBadge>
                {job.location}
              </JobBadge>
            )}
          </div>

          <h3
            className="
              text-2xl
              md:text-3xl
              font-bold
              text-gray-900
              mb-3
            "
          >
            {job.title}
          </h3>

          {job.shortDescription && (
            <p
              className="
                text-gray-700
                leading-relaxed
                max-w-3xl
              "
            >
              {
                job.shortDescription
              }
            </p>
          )}

          <div
            className="
              flex
              flex-wrap
              gap-x-6
              gap-y-2
              mt-5
              text-sm
              text-gray-600
            "
          >
            {job.payRange && (
              <span>
                <strong>
                  Pay:
                </strong>{" "}
                {job.payRange}
              </span>
            )}

            {job.scheduleDescription && (
              <span>
                <strong>
                  Schedule:
                </strong>{" "}
                {
                  job.scheduleDescription
                }
              </span>
            )}
          </div>
        </div>

        <div
          className="
            mt-6
            md:mt-0
            shrink-0
          "
        >
          <button
            type="button"
            onClick={onApply}
            className="
              w-full
              md:w-auto
              rounded-full
              bg-red-600
              text-white
              font-bold
              px-7
              py-3
              shadow-sm
              hover:bg-red-700
              transition
            "
          >
            View & Apply
          </button>
        </div>
      </div>
    </article>
  );
}

// =========================================================
// JOB DETAIL
// =========================================================

function JobDetail({
  job,
  onChangeJob,
}) {
  return (
    <article
      className="
        rounded-3xl
        bg-white/85
        backdrop-blur-sm
        shadow-sm
        border
        border-gray-100
        overflow-hidden
      "
    >
      <div
        className="
          bg-red-700
          text-white
          p-6
          md:p-8
        "
      >
        <p
          className="
            text-sm
            font-semibold
            uppercase
            tracking-[0.18em]
            text-red-100
            mb-2
          "
        >
          Now Applying For
        </p>

        <h2
          className="
            text-3xl
            md:text-4xl
            font-bold
          "
        >
          {job.title}
        </h2>
      </div>

      <div className="p-6 md:p-8">
        <div
          className="
            flex
            flex-wrap
            gap-2
            mb-6
          "
        >
          {job.location && (
            <JobBadge>
              {job.location}
            </JobBadge>
          )}

          {job.employmentType && (
            <JobBadge>
              {
                job.employmentType
              }
            </JobBadge>
          )}

          {job.payRange && (
            <JobBadge>
              {job.payRange}
            </JobBadge>
          )}
        </div>

        {job.shortDescription && (
          <p
            className="
              text-lg
              text-gray-700
              font-medium
              mb-6
            "
          >
            {
              job.shortDescription
            }
          </p>
        )}

        <div
          className="
            text-gray-700
            leading-7
            whitespace-pre-line
          "
        >
          {job.description}
        </div>

        {job.scheduleDescription && (
          <div
            className="
              mt-7
              rounded-2xl
              bg-gray-50
              p-5
            "
          >
            <strong>
              Schedule:
            </strong>{" "}
            {
              job.scheduleDescription
            }
          </div>
        )}

        <button
          type="button"
          onClick={onChangeJob}
          className="
            mt-6
            text-red-700
            font-semibold
            hover:underline
          "
        >
          ← Choose a different
          position
        </button>
      </div>
    </article>
  );
}

// =========================================================
// APPLICATION FORM
// =========================================================

function ApplicationForm({
  form,
  job,
  submitting,
  error,
  onUpdate,
  onResumeChange,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="
        rounded-3xl
        bg-white/90
        backdrop-blur-sm
        shadow-sm
        border
        border-gray-100
        p-6
        md:p-9
      "
    >
      <div className="mb-8">
        <p
          className="
            text-sm
            text-red-700
            font-semibold
            uppercase
            tracking-[0.15em]
            mb-2
          "
        >
          Application
        </p>

        <h2
          className="
            text-3xl
            font-bold
            text-gray-900
            mb-2
          "
        >
          Apply for {job.title}
        </h2>

        <p className="text-gray-600">
          Fields marked with * are
          required. A résumé is
          optional.
        </p>
      </div>

      {/* Honeypot */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          height: 0,
          overflow: "hidden",
        }}
      >
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) =>
              onUpdate(
                "website",
                e.target.value
              )
            }
          />
        </label>
      </div>

      <FormSection
        title="Contact Information"
      >
        <div
          className="
            grid
            md:grid-cols-2
            gap-5
          "
        >
          <FormInput
            label="First Name"
            required
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) =>
              onUpdate(
                "firstName",
                e.target.value
              )
            }
          />

          <FormInput
            label="Last Name"
            required
            autoComplete="family-name"
            value={form.lastName}
            onChange={(e) =>
              onUpdate(
                "lastName",
                e.target.value
              )
            }
          />

          <FormInput
            label="Email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) =>
              onUpdate(
                "email",
                e.target.value
              )
            }
          />

          <FormInput
            label="Phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) =>
              onUpdate(
                "phone",
                e.target.value
              )
            }
          />

          <FormSelect
            label="Preferred Contact Method"
            value={
              form.preferredContactMethod
            }
            onChange={(e) =>
              onUpdate(
                "preferredContactMethod",
                e.target.value
              )
            }
          >
            <option value="Email">
              Email
            </option>

            <option value="Phone">
              Phone
            </option>

            <option value="Text">
              Text
            </option>

            <option value="Either">
              Either
            </option>
          </FormSelect>
        </div>
      </FormSection>

      <FormSection
        title="Availability"
      >
        <div
          className="
            grid
            md:grid-cols-2
            gap-5
          "
        >
          <FormInput
            label="Available Start Date"
            type="date"
            value={
              form.availableStartDate
            }
            onChange={(e) =>
              onUpdate(
                "availableStartDate",
                e.target.value
              )
            }
          />

          <FormInput
            label="Years of Experience"
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={
              form.yearsExperience
            }
            onChange={(e) =>
              onUpdate(
                "yearsExperience",
                e.target.value
              )
            }
          />
        </div>

        <FormTextarea
          label="When are you available to work?"
          placeholder="Example: Monday through Friday after 4 PM, open availability Saturdays..."
          value={
            form.availability
          }
          onChange={(e) =>
            onUpdate(
              "availability",
              e.target.value
            )
          }
        />
      </FormSection>

      <FormSection
        title="Experience"
      >
        <div
          className="
            grid
            md:grid-cols-2
            gap-5
          "
        >
          <FormInput
            label="Current / Most Recent Employer"
            value={
              form.currentEmployer
            }
            onChange={(e) =>
              onUpdate(
                "currentEmployer",
                e.target.value
              )
            }
          />

          <FormInput
            label="Current / Most Recent Position"
            value={
              form.currentPosition
            }
            onChange={(e) =>
              onUpdate(
                "currentPosition",
                e.target.value
              )
            }
          />
        </div>
      </FormSection>

      <FormSection
        title="Tell Us About Yourself"
      >
        <FormTextarea
          label="A little about you"
          rows={5}
          placeholder="Tell us about your experience, strengths, interests, or anything else you'd like us to know."
          value={
            form.aboutYourself
          }
          onChange={(e) =>
            onUpdate(
              "aboutYourself",
              e.target.value
            )
          }
        />

        <FormTextarea
          label="Why would you like to work at The Mea Thai Cuisine?"
          rows={5}
          value={
            form.whyWorkHere
          }
          onChange={(e) =>
            onUpdate(
              "whyWorkHere",
              e.target.value
            )
          }
        />

        <FormTextarea
          label="Additional Comments"
          rows={4}
          value={
            form.additionalComments
          }
          onChange={(e) =>
            onUpdate(
              "additionalComments",
              e.target.value
            )
          }
        />
      </FormSection>

      <FormSection title="Resume">
        <div
          className="
            rounded-2xl
            border-2
            border-dashed
            border-gray-300
            bg-gray-50
            p-6
          "
        >
          <label
            className="
              block
              font-semibold
              text-gray-900
              mb-2
            "
          >
            Upload Resume
          </label>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={
              onResumeChange
            }
            className="
              block
              w-full
              text-sm
              text-gray-700
            "
          />

          <p
            className="
              mt-3
              text-sm
              text-gray-500
            "
          >
            Optional. PDF, DOC, or
            DOCX. Maximum file size
            5 MB.
          </p>

          {form.resume && (
            <div
              className="
                mt-4
                rounded-xl
                bg-white
                border
                border-gray-200
                px-4
                py-3
                text-sm
              "
            >
              <strong>
                Selected:
              </strong>{" "}
              {form.resume.name}
            </div>
          )}
        </div>
      </FormSection>

      {error && (
        <div
          role="alert"
          className="
            rounded-2xl
            bg-red-50
            border
            border-red-200
            text-red-800
            p-4
            mb-6
          "
        >
          {error}
        </div>
      )}

      <div
        className="
          border-t
          border-gray-200
          pt-6
        "
      >
        <button
          type="submit"
          disabled={submitting}
          className="
            w-full
            md:w-auto
            rounded-full
            bg-red-600
            text-white
            font-bold
            text-lg
            px-9
            py-4
            shadow-sm
            hover:bg-red-700
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
          "
        >
          {submitting
            ? "Submitting Application..."
            : "Submit Application"}
        </button>

        <p
          className="
            text-xs
            text-gray-500
            mt-4
            max-w-2xl
          "
        >
          By submitting this form,
          you're providing your
          information to The Mea Thai
          Cuisine for employment
          consideration.
        </p>
      </div>
    </form>
  );
}

// =========================================================
// SUCCESS
// =========================================================

function ApplicationSuccess({
  job,
  onAnother,
}) {
  return (
    <div
      className="
        rounded-3xl
        bg-white/90
        shadow-sm
        border
        border-green-200
        p-8
        md:p-12
        text-center
      "
    >
      <div
        className="
          w-16
          h-16
          rounded-full
          bg-green-100
          text-green-700
          flex
          items-center
          justify-center
          mx-auto
          mb-5
          text-3xl
          font-bold
        "
      >
        ✓
      </div>

      <h2
        className="
          text-3xl
          font-bold
          text-gray-900
          mb-3
        "
      >
        Application Received
      </h2>

      <p
        className="
          text-lg
          text-gray-700
          max-w-2xl
          mx-auto
        "
      >
        Thank you for applying for{" "}
        <strong>
          {job.title}
        </strong>
        . We've received your
        application.
      </p>

      <div
        className="
          flex
          flex-wrap
          justify-center
          gap-3
          mt-8
        "
      >
        <Link
          to="/"
          className="
            rounded-full
            bg-red-600
            text-white
            font-semibold
            px-6
            py-3
            hover:bg-red-700
            transition
          "
        >
          Return Home
        </Link>

        <button
          type="button"
          onClick={onAnother}
          className="
            rounded-full
            border
            border-gray-300
            bg-white
            font-semibold
            px-6
            py-3
            hover:bg-gray-50
            transition
          "
        >
          Submit Another
        </button>
      </div>
    </div>
  );
}

// =========================================================
// SMALL UI COMPONENTS
// =========================================================

function BenefitCard({
  title,
  text,
}) {
  return (
    <div
      className="
        rounded-2xl
        bg-white/80
        backdrop-blur-sm
        shadow-sm
        border
        border-gray-100
        p-6
      "
    >
      <h3
        className="
          text-xl
          font-bold
          text-gray-900
          mb-2
        "
      >
        {title}
      </h3>

      <p
        className="
          text-gray-600
          leading-relaxed
        "
      >
        {text}
      </p>
    </div>
  );
}

function JobBadge({
  children,
}) {
  return (
    <span
      className="
        inline-flex
        items-center
        rounded-full
        bg-gray-100
        text-gray-700
        text-sm
        font-medium
        px-3
        py-1
      "
    >
      {children}
    </span>
  );
}

function FormSection({
  title,
  children,
}) {
  return (
    <section
      className="
        border-b
        border-gray-200
        pb-8
        mb-8
        space-y-5
      "
    >
      <h3
        className="
          text-xl
          font-bold
          text-gray-900
        "
      >
        {title}
      </h3>

      {children}
    </section>
  );
}

function FormInput({
  label,
  required,
  ...props
}) {
  return (
    <label className="block">
      <span
        className="
          block
          text-sm
          font-semibold
          text-gray-800
          mb-2
        "
      >
        {label}

        {required && (
          <span className="text-red-600">
            {" "}
            *
          </span>
        )}
      </span>

      <input
        {...props}
        required={required}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-gray-900
          outline-none
          transition
          focus:border-red-500
          focus:ring-2
          focus:ring-red-100
        "
      />
    </label>
  );
}

function FormSelect({
  label,
  children,
  ...props
}) {
  return (
    <label className="block">
      <span
        className="
          block
          text-sm
          font-semibold
          text-gray-800
          mb-2
        "
      >
        {label}
      </span>

      <select
        {...props}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-gray-900
          outline-none
          transition
          focus:border-red-500
          focus:ring-2
          focus:ring-red-100
        "
      >
        {children}
      </select>
    </label>
  );
}

function FormTextarea({
  label,
  rows = 4,
  ...props
}) {
  return (
    <label className="block">
      <span
        className="
          block
          text-sm
          font-semibold
          text-gray-800
          mb-2
        "
      >
        {label}
      </span>

      <textarea
        {...props}
        rows={rows}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-gray-900
          outline-none
          resize-y
          transition
          focus:border-red-500
          focus:ring-2
          focus:ring-red-100
        "
      />
    </label>
  );
}

function JobLoading() {
  return (
    <div className="space-y-5">
      {[1, 2, 3].map(
        (item) => (
          <div
            key={item}
            className="
              rounded-3xl
              bg-white/70
              p-7
              animate-pulse
            "
          >
            <div
              className="
                h-5
                bg-gray-200
                rounded
                w-1/4
                mb-4
              "
            />

            <div
              className="
                h-8
                bg-gray-200
                rounded
                w-1/2
                mb-4
              "
            />

            <div
              className="
                h-4
                bg-gray-200
                rounded
                w-full
                mb-2
              "
            />

            <div
              className="
                h-4
                bg-gray-200
                rounded
                w-3/4
              "
            />
          </div>
        )
      )}
    </div>
  );
}

function NoJobs() {
  return (
    <div
      className="
        rounded-3xl
        bg-white/80
        backdrop-blur-sm
        border
        border-gray-100
        shadow-sm
        p-8
        md:p-12
        text-center
      "
    >
      <h3
        className="
          text-2xl
          font-bold
          text-gray-900
          mb-3
        "
      >
        No Current Openings
      </h3>

      <p
        className="
          text-gray-600
          max-w-xl
          mx-auto
        "
      >
        We aren't currently
        advertising any open
        positions, but check back
        soon. New opportunities will
        appear here automatically.
      </p>
    </div>
  );
}

// =========================================================
// HELPERS
// =========================================================

function getApiErrorMessage(
  err
) {
  const data =
    err?.response?.data;

  if (typeof data === "string") {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (data?.title) {
    return data.title;
  }

  if (data?.errors) {
    const messages =
      Object.values(
        data.errors
      )
        .flat()
        .filter(Boolean);

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return "We couldn't submit your application. Please check your information and try again.";
}

function mapEmploymentType(
  value
) {
  if (!value) {
    return undefined;
  }

  const text =
    value
      .trim()
      .toLowerCase();

  if (
    text.includes("full")
  ) {
    return "FULL_TIME";
  }

  if (
    text.includes("part")
  ) {
    return "PART_TIME";
  }

  if (
    text.includes("temporary")
  ) {
    return "TEMPORARY";
  }

  if (
    text.includes("season")
  ) {
    return "TEMPORARY";
  }

  if (
    text.includes("contract")
  ) {
    return "CONTRACTOR";
  }

  if (
    text.includes("intern")
  ) {
    return "INTERN";
  }

  return undefined;
}

export default JoinOurTeamPage;