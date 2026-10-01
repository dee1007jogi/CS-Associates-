const fs = require('fs');

const relsXml = fs.readFileSync('temp_docx/word/_rels/document.xml.rels', 'utf8');
const docXml = fs.readFileSync('temp_docx/word/document.xml', 'utf8');

// Parse rels
const relMap = {};
for (const match of relsXml.matchAll(/Id="([^"]+)"[^>]*Target="([^"]+)"/g)) {
  relMap[match[1]] = match[2];
}
console.log('Rels mapped count:', Object.keys(relMap).length);

// In document.xml, find paragraphs containing <a:blip r:embed="rId..."/>
const pRegex = /<w:p[\s>].*?<\/w:p>/gs;
let match;
let lastTexts = [];
let imgMappings = [];

while ((match = pRegex.exec(docXml)) !== null) {
  const pStr = match[0];
  const tMatches = [...pStr.matchAll(/<w:t[^>]*>(.*?)<\/w:t>/g)].map(m => m[1]);
  const pText = tMatches.join('');
  
  const blipMatches = [...pStr.matchAll(/r:embed="([^"]+)"/g)].map(m => m[1]);
  if (blipMatches.length > 0) {
    blipMatches.forEach(rid => {
      const mediaFile = relMap[rid];
      imgMappings.push({
        media: mediaFile,
        rid: rid,
        precedingText: lastTexts.slice(-3).join(' | '),
        inlineText: pText
      });
    });
  }
  
  if (pText.trim()) {
    lastTexts.push(pText.trim());
    if (lastTexts.length > 10) lastTexts.shift();
  }
}

imgMappings.forEach((m, idx) => {
  console.log(`\n[${idx+1}] Media: ${m.media} (${m.rid})`);
  console.log(`   Preceded by: ${m.precedingText}`);
  if (m.inlineText) console.log(`   Inline text: ${m.inlineText}`);
});
