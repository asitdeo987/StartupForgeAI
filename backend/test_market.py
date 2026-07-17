from app.ai.market import market_analysis

response = market_analysis(
    title="StartupForgeAI",
    description="AI platform for startup founders.",
    industry="Artificial Intelligence",
    target_audience="Students"
)

print(response)