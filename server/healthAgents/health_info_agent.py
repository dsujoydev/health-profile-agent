from .base_agent import BaseAgent

class HealthInfoAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="HealthEducator",
            description="I'm your health information specialist. I can explain health concepts, answer questions, debunk myths, and provide evidence-based information.",
            avatar="health_info_avatar.png"
        )
        
        # Common health topics that could be expanded
        self.health_topics = [
            "Nutrition and Diet",
            "Exercise and Fitness",
            "Mental Health and Stress",
            "Sleep and Recovery",
            "Preventive Care",
            "Chronic Disease Management"
        ]

    def explain_health_concept(self, concept):
        """Provide a clear explanation of a health concept"""
        prompt = f"""
        Explain the health concept: "{concept}"
        
        Provide:
        1. Simple, clear definition
        2. Why it's important for health
        3. How it works in the body
        4. Common misconceptions about it
        5. Practical ways to apply this knowledge
        
        Use language that's accessible but scientifically accurate. Include relevant examples.
        """
        return self.get_response(prompt)
    
    def answer_health_question(self, question):
        """Answer a specific health question with evidence-based information"""
        prompt = f"""
        Answer this health question: "{question}"
        
        Provide:
        1. A direct, clear answer
        2. Scientific reasoning behind the answer
        3. Any important caveats or individual variations
        4. Actionable advice if applicable
        5. When to consult healthcare professionals
        
        Be thorough but not overwhelming, and always emphasize consulting professionals for medical concerns.
        """
        return self.get_response(prompt)
    
    def debunk_health_myth(self, myth):
        """Address and debunk common health myths with facts"""
        prompt = f"""
        Address this health myth: "{myth}"
        
        Provide:
        1. Why this is considered a myth
        2. What the scientific evidence actually shows
        3. Where this myth likely originated
        4. The correct information people should know
        5. How to evaluate health information credibility
        
        Be respectful but clear about what the evidence supports.
        """
        return self.get_response(prompt)
    
    def provide_research_summary(self, research_topic):
        """Summarize current research on a health topic"""
        prompt = f"""
        Provide a research summary on: "{research_topic}"
        
        Include:
        1. Current scientific consensus
        2. Key recent findings
        3. Areas where research is still developing
        4. Practical implications for everyday health
        5. Quality of evidence (strong, moderate, limited)
        
        Present information objectively and note any limitations or controversies.
        """
        return self.get_response(prompt)
    
    def create_educational_content(self, topic, format_type="article"):
        """Create educational content on a health topic"""
        prompt = f"""
        Create educational content about "{topic}" in {format_type} format.
        
        Structure the content with:
        1. Engaging introduction that explains why this matters
        2. Key facts and information organized clearly
        3. Common questions and answers
        4. Practical tips for readers
        5. Credible sources for further learning
        
        Make it informative, engaging, and actionable for a general audience.
        """
        return self.get_response(prompt)
    
    def compare_health_approaches(self, approach1, approach2, goal):
        """Compare different health approaches for a specific goal"""
        prompt = f"""
        Compare "{approach1}" vs "{approach2}" for the goal of "{goal}".
        
        Analyze:
        1. Scientific evidence for each approach
        2. Pros and cons of each
        3. Who might benefit more from each approach
        4. Sustainability and practicality
        5. Potential risks or considerations
        6. Overall recommendation based on current evidence
        
        Be balanced and acknowledge that individual needs vary.
        """
        return self.get_response(prompt) 