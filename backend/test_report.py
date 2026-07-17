from pprint import pprint

from app.ai.startup_report import generate_startup_report


report = generate_startup_report(

    title="StartupForgeAI",

    description="AI platform helping entrepreneurs validate startup ideas.",

    industry="Artificial Intelligence",

    target_audience="Students and Entrepreneurs",

)

pprint(report)