#!/bin/bash
# submission_packager.sh

echo "📦 Packaging SubScout for Amazon Nova AI Hackathon..."

# Create a zip of the repo (excluding node_modules and .git)
zip -r subscout_submission.zip . -x "node_modules/*" -x ".git/*" -x ".next/*"

echo "✅ Created subscout_submission.zip"
echo "📝 Submission Checklist:"
echo "1. Upload demo video to YouTube/Vimeo."
echo "2. Submit this zip file (or GitHub repo link) to Devpost."
echo "3. Fill out the feedback survey for the bonus prize."
echo "4. Tag #AmazonNova in your social posts."
