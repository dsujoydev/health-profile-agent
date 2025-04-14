from healthAgents.base_agent import BaseAgent

class HealthInfoAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="HealthEducator",
            description="I'm your health information specialist. I can provide evidence-based information about fitness, nutrition, and wellness topics to help you make informed decisions.",
            avatar="health_info_avatar.png"
        )
        
        # Common health topics that could be expanded or stored in a database
        self.health_topics = [
            "Nutrition basics",
            "Exercise science",
            "Weight management",
            "Muscle building",
            "Cardiovascular health",
            "Recovery and rest",
            "Supplements",
            "Mental wellness"
        ]

    def explain_concept(self, concept):
        """Provide an educational explanation of a health or fitness concept"""
        prompt = f"""
        Provide a clear, evidence-based explanation of the following health/fitness concept:
        
        {concept}
        
        Include:
        1. A simple definition in layperson's terms
        2. The science behind how it works
        3. Practical relevance to health and fitness goals
        4. Common misconceptions or myths
        5. How to apply this knowledge in everyday life
        
        Format this as an educational resource that's accessible to someone without a scientific background.
        """
        return self.get_response(prompt)
    
    def answer_health_question(self, question):
        """Answer a specific health or fitness question"""
        prompt = f"""
        Answer the following health/fitness question with evidence-based information:
        
        {question}
        
        Your answer should:
        1. Directly address the question
        2. Provide context for understanding
        3. Reference current scientific understanding
        4. Acknowledge any areas of ongoing research or debate
        5. Offer practical takeaways when applicable
        
        Format this as a helpful, informative response that avoids medical advice but provides educational information.
        """
        return self.get_response(prompt)
    
    def debunk_myth(self, myth):
        """Debunk a common health or fitness myth"""
        prompt = f"""
        Analyze and debunk the following health/fitness myth:
        
        {myth}
        
        Include:
        1. What the myth claims
        2. Why people might believe it
        3. What the scientific evidence actually shows
        4. The potential harm of believing this myth
        5. The accurate information people should know instead
        
        Format this as a respectful correction that educates without condescension.
        """
        return self.get_response(prompt)
    
    def explain_research_finding(self, research_topic):
        """Explain recent research findings on a health topic"""
        prompt = f"""
        Explain current research findings on the following health/fitness topic:
        
        {research_topic}
        
        Include:
        1. A summary of what researchers have discovered
        2. How this research has evolved over time
        3. The strength of the evidence (consensus vs. emerging)
        4. Practical implications for the average person
        5. Areas where more research is still needed
        
        Format this as an accessible research summary that translates scientific findings into useful knowledge.
        """
        return self.get_response(prompt)
    
    def create_educational_content(self, topic, format_type="article"):
        """Create educational content on a health or fitness topic"""
        prompt = f"""
        Create educational {format_type} content about:
        
        {topic}
        
        The content should:
        1. Start with an engaging introduction
        2. Break down complex concepts into understandable sections
        3. Include evidence-based information and facts
        4. Address common questions or misconceptions
        5. Provide actionable takeaways
        
        Format this as a well-structured {format_type} that's informative, engaging, and scientifically accurate.
        """
        return self.get_response(prompt)
    
    def compare_approaches(self, approach1, approach2, goal):
        """Compare different health or fitness approaches for a specific goal"""
        prompt = f"""
        Compare the following approaches for achieving this health/fitness goal:
        
        Goal: {goal}
        Approach 1: {approach1}
        Approach 2: {approach2}
        
        Include:
        1. Key principles of each approach
        2. Scientific evidence supporting each
        3. Potential benefits of each approach
        4. Potential drawbacks or limitations
        5. Who might benefit most from each approach
        6. Factors to consider when choosing between them
        
        Format this as an objective comparison that helps someone make an informed decision based on their individual circumstances.
        """
        return self.get_response(prompt)