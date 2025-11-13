import { NextRequest, NextResponse } from 'next/server'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const BUSINESS_INFO = {
  name: "De Jongh's Panelbeating Centre",
  services: [
    'Panel beating and collision repair',
    'Professional spray painting and full vehicle resprays',
    'Dent removal and minor repairs',
    'Chassis straightening and alignment',
    'Rust treatment and prevention',
    'Paint polishing and detailing',
    'Insurance claims assistance',
    'Paint protection and coating'
  ],
  reputation: 'Trusted family-run business with years of experience',
  languages: ['English', 'Afrikaans'],
  hours: 'Monday to Friday: 8:00 AM - 5:00 PM, Saturday: 8:00 AM - 1:00 PM',
  turnaround: 'Most repairs completed within 3-7 business days, depending on extent of damage'
}

function generateResponse(userMessage: string, history: Message[]): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|goeie dag|hallo)/i)) {
    return "Hello! Thank you for reaching out to De Jongh's Panelbeating Centre. I'm here to help with all your auto body repair needs. What can I assist you with today?\n\nHallo! Dankie dat jy uitreik na De Jongh se Panelklop Sentrum. Waarmee kan ek jou vandag help?"
  }

  if (lowerMessage.match(/services|what do you do|help with|repairs|offerings/i)) {
    return "At De Jongh's Panelbeating Centre, we offer a comprehensive range of auto body repair services:\n\n• Panel Beating & Collision Repair - Expert restoration of damaged vehicle panels\n• Professional Spray Painting - High-quality paint matching and full resprays\n• Dent Removal - Precision repair of minor and major dents\n• Chassis Straightening - Advanced alignment for structural integrity\n• Rust Treatment - Complete rust removal and prevention\n• Paint Polishing & Detailing - Professional finishing touches\n• Insurance Claims - We assist with the entire claims process\n• Paint Protection - Long-lasting coating and protection solutions\n\nWhich service interests you? I'm happy to provide more details or help you get started with a quote."
  }

  if (lowerMessage.match(/spray|paint|respray|colour|color/i)) {
    return "Our spray painting services are second to none! We specialize in:\n\n• Full Vehicle Resprays - Complete color changes or restoration\n• Panel Painting - Matching your existing paint perfectly\n• Custom Colours - Wide range of colors and finishes\n• Paint Correction - Fixing faded, scratched, or damaged paint\n• Quality Finishes - From standard to metallic and pearl finishes\n\nWe use high-quality automotive paints with computer color matching to ensure a perfect finish that blends seamlessly. Our experienced team takes pride in delivering showroom-quality results.\n\nWould you like an estimate for spray painting? Just let me know your vehicle make, model, and what areas need painting."
  }

  if (lowerMessage.match(/dent|scratch|minor damage|small repair/i)) {
    return "We handle all types of dent repairs, from minor door dings to major collision damage:\n\n• Paintless Dent Repair (PDR) - For minor dents without paint damage\n• Traditional Dent Repair - For larger dents requiring filling and repainting\n• Scratch Repair - Buffing and touch-up painting\n• Door Ding Removal - Quick and affordable fixes\n\nOur skilled technicians can assess the damage and recommend the most cost-effective solution. Many minor dents can be repaired quickly, often while you wait.\n\nCan you describe the damage you need repaired? What make and model is your vehicle?"
  }

  if (lowerMessage.match(/insurance|claim|accident/i)) {
    return "We make the insurance claims process as smooth as possible:\n\n✓ We work with all major insurance companies\n✓ Assist with claim documentation and paperwork\n✓ Provide detailed damage assessments and quotes\n✓ Direct billing to your insurance (if approved)\n✓ Keep you updated throughout the repair process\n\nOur team has extensive experience handling insurance claims. We'll guide you through every step to ensure your claim is processed efficiently and your vehicle is restored to pre-accident condition.\n\nHave you already filed a claim with your insurance, or would you like guidance on starting the process?"
  }

  if (lowerMessage.match(/estimate|quote|price|cost|how much/i)) {
    return "I'd be happy to help you get an estimate for your repair! To provide an accurate quote, I'll need some information:\n\n1. Vehicle Details:\n   • Make and model?\n   • Year of manufacture?\n\n2. Damage Description:\n   • What type of damage? (collision, dents, rust, etc.)\n   • Which panels/areas are affected?\n   • Severity of damage?\n\n3. Photos (if possible):\n   • Clear photos help us provide more accurate estimates\n\nYou can also bring your vehicle to our shop for a free in-person assessment. Most estimates are provided within 24 hours.\n\nPlease share the details above, and I'll help you get a quote right away!"
  }

  if (lowerMessage.match(/book|appointment|schedule|when can|bring my car|availability/i)) {
    return "I can help you schedule your repair!\n\nOur operating hours:\n• Monday to Friday: 8:00 AM - 5:00 PM\n• Saturday: 8:00 AM - 1:00 PM\n• Sunday: Closed\n\nTo book your appointment, please provide:\n1. Your preferred date and time\n2. Vehicle make, model, and year\n3. Brief description of the work needed\n4. Your contact name and phone number\n\nTypical turnaround times:\n• Minor repairs (dents, scratches): 1-2 days\n• Panel repairs and painting: 3-5 days\n• Major collision repair: 5-10 days\n• Full respray: 7-14 days\n\nWould you like to schedule an appointment? What date works best for you?"
  }

  if (lowerMessage.match(/rust|corrosion|rusty/i)) {
    return "Rust treatment is one of our specialties! We provide comprehensive rust repair:\n\n• Complete Rust Removal - Grinding and treating affected areas\n• Panel Replacement - For severely corroded panels\n• Rust Prevention Treatment - Protective coatings to prevent future rust\n• Undercarriage Protection - Rust-proofing for long-term protection\n• Warranty on Rust Repairs - We stand behind our work\n\nRust can spread quickly if not treated properly, so it's important to address it early. We remove all rust completely, treat the metal, and apply protective coatings before repainting.\n\nWhere is the rust on your vehicle? How extensive is it?"
  }

  if (lowerMessage.match(/how long|turnaround|duration|time|when will|ready/i)) {
    return "Repair turnaround times depend on the extent of damage:\n\n⚡ Quick Repairs (1-2 days):\n• Minor dent removal\n• Small scratches and touch-ups\n• Single panel repairs\n\n🔧 Standard Repairs (3-5 days):\n• Multiple panel repairs\n• Paint matching and blending\n• Moderate collision damage\n\n🏗️ Major Repairs (5-10 days):\n• Extensive collision damage\n• Chassis straightening\n• Multiple panels and structural work\n\n🎨 Full Resprays (7-14 days):\n• Complete color changes\n• Full vehicle restoration\n\nWe always provide an estimated completion date when you book. If parts need to be ordered, this may extend the timeline. We'll keep you informed every step of the way!\n\nWhat type of repair do you need?"
  }

  if (lowerMessage.match(/maintenance|care|protect|tips|keep|prevent/i)) {
    return "Great question! Here are some tips to keep your vehicle's paint and body in top condition:\n\n🚗 Regular Maintenance:\n• Wash your car regularly (weekly is ideal) to remove dirt and contaminants\n• Wax every 3-6 months for paint protection\n• Park in shade or covered areas when possible\n• Address minor scratches and chips promptly to prevent rust\n\n🛡️ Paint Protection:\n• Consider ceramic coating for long-lasting protection\n• Paint protection film (PPF) for high-impact areas\n• Underbody rust-proofing in coastal or wet climates\n\n⚠️ What to Watch For:\n• Bubbling paint (sign of rust underneath)\n• Stone chips on hood and bumpers\n• Fading or oxidized paint\n• Water spots and bird droppings (remove quickly!)\n\nWe offer paint protection services and detailing to keep your vehicle looking showroom fresh. Would you like to know more about any of these services?"
  }

  if (lowerMessage.match(/chassis|frame|alignment|straighten|structural/i)) {
    return "Chassis straightening is critical for vehicle safety and performance. Our advanced equipment ensures precise repairs:\n\n• Laser Measurement Technology - Accurate assessment of frame damage\n• Hydraulic Straightening Systems - Professional frame correction\n• Structural Integrity Restoration - Return to manufacturer specifications\n• Post-Repair Verification - Detailed measurements and documentation\n\nFrame damage often occurs in:\n✗ Front or rear-end collisions\n✗ Side-impact accidents\n✗ Rollovers or severe impacts\n\nSymptoms of frame damage:\n• Vehicle pulls to one side\n• Uneven tire wear\n• Doors or trunk don't close properly\n• Unusual noises or vibrations\n\nWe'll assess your vehicle's structural integrity and ensure it's safe to drive. Have you been in an accident recently, or are you experiencing alignment issues?"
  }

  if (lowerMessage.match(/afrikaans|praat afrikaans|verstaan jy afrikaans/i)) {
    return "Ja, ek kan jou in Afrikaans help!\n\nBy De Jongh se Panelklop Sentrum bied ons:\n• Panelklop en botsing herstel\n• Professionele spuitverf en volledige herverf\n• Duik verwydering\n• Raamwerk reguit maak\n• Roes behandeling\n• Verf polish en detaillering\n• Versekering eise hulp\n\nWaarmee kan ek jou vandag help? Vra gerus enige vrae in Afrikaans of Engels!"
  }

  return "Thank you for your question! As De Jongh's Panelbeating Centre's AI assistant, I'm here to help with:\n\n• Information about our services (panel beating, spray painting, dent removal, rust repair)\n• Repair estimates and quotes\n• Booking appointments\n• Insurance claims assistance\n• Maintenance and care tips\n• Updates on your repair job\n\nCould you please provide more details about what you need? For example:\n- What type of repair or service interests you?\n- Do you have damage that needs assessing?\n- Would you like to book an appointment?\n- Are you looking for a specific service?\n\nI'm here to help in both English and Afrikaans! (Ek kan ook in Afrikaans help!)"
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      )
    }

    const response = generateResponse(message, history || [])

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
