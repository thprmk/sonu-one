const fs = require('fs');

let rawContent = fs.readFileSync('templates/index.json', 'utf8');

// Find where the JSON actually starts to preserve comments
let jsonStart = rawContent.indexOf('{');
let comments = rawContent.substring(0, jsonStart);
let jsonString = rawContent.substring(jsonStart);

let data = JSON.parse(jsonString);

if (data.sections && data.sections.slideshow_Fh3xDL) {
  let slideshow = data.sections.slideshow_Fh3xDL;
  
  // Iterate through all blocks (slides)
  for (let blockKey in slideshow.blocks) {
    let block = slideshow.blocks[blockKey];
    
    if (block.type === '_slide') {
      // DESKTOP ONLY: Move position to bottom-left
      block.settings.position = 'bottom-left';
      // DO NOT TOUCH position_mobile
      
      // Look for static-slide-content
      if (block.blocks) {
        for (let innerKey in block.blocks) {
          let innerBlock = block.blocks[innerKey];
          if (innerBlock.type === '_slide-content') {
            // DESKTOP ONLY: Change flex alignment
            innerBlock.settings.horizontal_alignment_flex_direction_column = 'flex-start';
            // DO NOT TOUCH horizontal_alignment_flex_direction_column_mobile
            
            // Note: We are deliberately NOT adding padding so we don't mess up mobile scaling!
            
            if (innerBlock.blocks) {
              for (let textKey in innerBlock.blocks) {
                let textBlock = innerBlock.blocks[textKey];
                
                if (textBlock.type === 'text') {
                  // DESKTOP ONLY: Align text
                  textBlock.settings.custom_text_alignment = 'left';
                  textBlock.settings.text_alignment = 'left';
                  // DO NOT TOUCH text_alignment_mobile
                  
                  // Note: We are deliberately NOT touching padding-block-end because mobile-padding-scale depends on it!
                }
              }
            }
          }
        }
      }
    }
  }
  
  fs.writeFileSync('templates/index.json', comments + JSON.stringify(data, null, 2), 'utf8');
  console.log('Desktop slideshow aligned left successfully. Mobile preserved!');
} else {
  console.log('Slideshow section not found in index.json');
}
