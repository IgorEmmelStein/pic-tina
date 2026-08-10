import React, { useState, useMemo, useEffect } from "react";

export default function SearchableFAQs({
  title,
  paragraphs = [],
  faqs = [],
  categories = [], // Pass categories if you want the filter buttons to work
  ctaUrl,
  ctaTitle,
  btnClass = "inline-block bg-primary-400 text-primary-800 px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all transform hover:-translate-y-1",
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.init({
        once: true,
        duration: 700,
      });
      AOS.refresh();
    });
  }, []);

  const filteredFaqs = useMemo(() => {
    let filtered = faqs;

    // Filter by Category
    if (activeCategory !== "all") {
      filtered = filtered.filter((faq) => faq.categoryId === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeCategory, faqs]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-primary-800 py-24 px-6 relative overflow-hidden" id="faq-section">
      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight" 
            dangerouslySetInnerHTML={{ __html: title || "How can we help?" }} 
          />
          
          {paragraphs.length > 0 && (
            <div className="space-y-4 max-w-2xl mx-auto font-body text-white/80 text-base mb-8">
              {paragraphs.map((para, idx) => (
                <p key={idx} dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>
          )}

          {/* Search Input Bar */}
          <div className="relative max-w-2xl mx-auto mb-10">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by keyword (e.g. 'Medical', 'Cost', 'Solo')..."
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 pl-14 pr-6 font-body text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories Filter (Only show if categories exist) */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-6 py-2 rounded-full border border-white/20 font-body text-sm font-bold uppercase tracking-widest transition-all ${
                  activeCategory === "all"
                    ? "bg-primary-400 text-primary-800 border-primary-400"
                    : "text-white hover:bg-white/10"
                }`}
              >
                All Questions
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2 rounded-full border border-white/20 font-body text-sm font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary-400 text-primary-800 border-primary-400"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* FAQs Accordion List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index < 10 ? index * 50 : 0}
                  className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 transition-all duration-300"
                >
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex justify-between items-center p-6 cursor-pointer outline-none focus:outline-none text-left"
                  >
                    <span 
                      className="font-heading text-lg md:text-xl font-bold text-white pr-8 leading-tight" 
                      dangerouslySetInnerHTML={{ __html: faq.question }} 
                    />
                    <span 
                      className={`text-white text-2xl transition-transform duration-300 shrink-0 ${isOpen ? "rotate-90" : ""}`}
                    >
                      ⟩
                    </span>
                  </button>
                  
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-white/80 font-body leading-relaxed text-base border-t border-white/10 pt-4 mt-2">
                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-20">
                <p className="text-white/60 font-body italic text-lg">
                  No questions found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA Block */}
        {ctaUrl && ctaTitle && (
          <div 
            className="mt-20 text-center bg-white/5 p-12 rounded-[3rem] border border-white/10 max-w-4xl mx-auto" 
            data-aos="fade-up"
          >
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
              Still have a specific question?
            </h3>
            <p className="font-body text-white/70 mb-8 max-w-md mx-auto text-sm">
              Our senior instructors are happy to discuss your specific goals and flight training timeline.
            </p>
            <a href={ctaUrl} className={btnClass}>
              {ctaTitle}
            </a>
          </div>
        )}
        
      </div>
    </section>
  );
}