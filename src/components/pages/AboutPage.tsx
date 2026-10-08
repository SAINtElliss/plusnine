import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageType } from '../../data/projects';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="page-view page-view--about">
      {/* Page Header (Warm Paper) */}
      <section className="page-header-section page-header-section--paper">
        <div className="container">
          <div className="page-breadcrumbs">
            <span className="page-crumb-tag">CREATIVE COLLECTIVE · EDMONTON</span>
          </div>

          <div className="page-title-block">
            <h1 className="page-hero-title">
              <span className="page-title-sans">ABOUT</span>{' '}
              <span className="page-title-serif">plusnine.</span>
            </h1>
            <p className="page-hero-subtitle">
              An independent, multidisciplinary creative collective rooted in African culture and the diaspora. Based in Edmonton, Canada, and connected by people, ideas, and experiences that extend far beyond it.
            </p>
          </div>
        </div>
      </section>

      {/* 1. OUR POINT OF VIEW */}
      <section className="about-editorial-section about-section--pov">
        <div className="container">
          <div className="about-section-inner">
            <div className="editorial-label-row">
              <span className="editorial-label-meta">OUR POINT OF VIEW</span>
            </div>

            <blockquote className="about-editorial-statement">
              <span className="about-stmt-bold">DIFFERENT MINDS.</span>
              <span className="about-stmt-serif">SHARED CULTURE.</span>
              <span className="about-stmt-bold">ENDLESS WAYS TO</span>
              <span className="about-stmt-serif">create.</span>
            </blockquote>

            <div className="about-body-grid about-pov-grid">
              <div className="about-body-col">
                <p className="about-body-p about-p--lead">
                  PlusNine began with a shared desire to see more of ourselves in the stories being told, the spaces being created, and the culture being celebrated. Not just the familiar narratives, but the everyday experiences, unexpected perspectives, and creative expressions that make our communities what they are.
                </p>
              </div>
              <div className="about-body-col">
                <p className="about-body-p">
                  We believe African culture isn't something that can be reduced to a single story, aesthetic, or tradition. It's constantly evolving, shaped by the people who carry it, reinterpret it, challenge it, and make it their own.
                </p>
                <p className="about-body-p">
                  That's what brings us together. We're a collective of creatives working across different disciplines, from music, fashion, photography, and filmmaking to graphic design, editorial storytelling, marketing, and event production. Each of us brings something different to the table, and that's the point. We don't believe creativity needs to exist in separate boxes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO */}
      <section className="about-editorial-section about-section--what-we-do">
        <div className="container">
          <div className="about-section-inner">
            <div className="about-split-layout">
              <div className="about-split-header">
                <div className="editorial-label-row">
                  <span className="editorial-label-meta">WHAT WE DO</span>
                </div>

                <blockquote className="about-editorial-statement">
                  <span className="about-stmt-bold">WE CREATE THINGS.</span>
                  <span className="about-stmt-serif">WE BRING PEOPLE TOGETHER.</span>
                  <span className="about-stmt-bold">WE MAKE ROOM FOR</span>
                  <span className="about-stmt-serif">more.</span>
                </blockquote>
              </div>

              <div className="about-split-body">
                <p className="about-body-p">
                  Sometimes that looks like a magazine exploring identity and everyday Black life. Other times, it's a film screening, a music project, a visual campaign, or simply an opportunity to bring people into the same room.
                </p>

                <p className="about-pullquote">
                  Our work takes different forms because our interests do too.
                </p>

                <p className="about-body-p">
                  Through collaborative projects, original productions, publications, and shared experiences, we explore what happens when people with different skills and perspectives create together.
                </p>

                <p className="about-body-p">
                  But PlusNine isn't only about what we produce. It's also about the relationships built along the way, the ideas exchanged, and the opportunities that come from being part of a creative community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE PEOPLE BEHIND IT */}
      <section className="about-editorial-section about-section--people">
        <div className="container">
          <div className="about-section-inner">
            <div className="editorial-label-row">
              <span className="editorial-label-meta">THE PEOPLE BEHIND IT</span>
            </div>

            <blockquote className="about-editorial-statement">
              <span className="about-stmt-bold">INDIVIDUAL VOICES.</span>
              <span className="about-stmt-serif">ONE COLLECTIVE.</span>
            </blockquote>

            <div className="about-body-grid about-people-grid">
              <div className="about-body-col">
                <p className="about-body-p">
                  Behind PlusNine are people with their own stories, ambitions, talents, and creative ventures.
                </p>
                <p className="about-body-p">
                  Some of us make music. Some work in fashion, design, photography, filmmaking, writing, or events. Some are building brands and businesses of their own. And many of us do more than one thing.
                </p>
              </div>
              <div className="about-body-col">
                <p className="about-body-p">
                  PlusNine gives those different identities a place to meet.
                </p>
                <p className="about-body-p">
                  We want our members to grow as individuals just as much as we want to grow together. The collective isn't meant to replace anyone's personal creative identity. It's a space where those identities can connect, contribute, and inspire something bigger.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('people')}
                  className="about-collective-text-cta"
                >
                  <span>MEET THE COLLECTIVE</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY IT MATTERS */}
      <section className="about-editorial-section about-section--why">
        <div className="container">
          <div className="about-section-inner">
            <div className="editorial-label-row">
              <span className="editorial-label-meta">WHY IT MATTERS</span>
            </div>

            <blockquote className="about-editorial-statement">
              <span className="about-stmt-bold">OUR CULTURE.</span>
              <span className="about-stmt-serif">OUR COMMUNITY.</span>
              <span className="about-stmt-bold">OUR STORIES TO</span>
              <span className="about-stmt-serif">tell.</span>
            </blockquote>

            <div className="about-why-content">
              <p className="about-why-lead">
                Representation matters, but so does having the freedom to tell our stories in our own ways.
              </p>

              <div className="about-body-grid about-why-grid">
                <div className="about-body-col">
                  <p className="about-body-p">
                    We want to celebrate African creativity without limiting what it can look or sound like. To honour where we come from while embracing who we're becoming. To make space for the familiar and the experimental, the traditional and the unexpected.
                  </p>
                </div>
                <div className="about-body-col">
                  <p className="about-body-p">
                    And above all, to create experiences that make people feel connected&mdash;to the work, to the culture, and to one another.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing Statement */}
      <section className="about-closing-section">
        <div className="container">
          <div className="about-closing-card">
            <div className="editorial-label-row">
              <span className="editorial-label-meta">PLUSNINE &middot; OUR CULTURE</span>
            </div>
            <div className="about-closing-statement">
              <span className="about-closing-bold">THIS IS OUR CULTURE.</span>
              <span className="about-closing-bold">OUR COMMUNITY.</span>
              <span className="about-closing-serif">Welcome home.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
