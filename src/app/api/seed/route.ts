import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();

  try {
    // 1. Insert Authors
    const { data: authorData, error: authorError } = await supabase
      .from('authors')
      .upsert([
        {
          name: 'ThinkBharti Editorial',
          slug: 'thinkbharti-editorial',
          bio: 'The editorial team at ThinkBharti.',
          designation: 'Editorial Desk'
        },
        {
          name: 'Rahul Sharma',
          slug: 'rahul-sharma',
          bio: 'Senior technology correspondent.',
          designation: 'Tech Editor'
        },
        {
          name: 'Priya Desai',
          slug: 'priya-desai',
          bio: 'Environmental and urban policy analyst.',
          designation: 'Policy Analyst'
        },
        {
          name: 'Amit Kumar',
          slug: 'amit-kumar',
          bio: 'Sports enthusiast and reporter.',
          designation: 'Sports Reporter'
        }
      ], { onConflict: 'slug' })
      .select();

    if (authorError) throw authorError;

    // 2. Insert Categories
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .upsert([
        { name: 'India', slug: 'india' },
        { name: 'Finance', slug: 'finance' },
        { name: 'Science', slug: 'science' },
        { name: 'Environment', slug: 'environment' },
        { name: 'Sports', slug: 'sports' }
      ], { onConflict: 'slug' })
      .select();

    if (categoryError) throw categoryError;

    // Helper to get IDs
    const getAuthorId = (slug: string) => authorData.find(a => a.slug === slug)?.id;
    const getCategoryId = (slug: string) => categoryData.find(c => c.slug === slug)?.id;

    // 3. Insert Posts
    const { error: postsError } = await supabase
      .from('posts')
      .upsert([
        {
          title: 'A New Chapter for a New India: Growth, Innovation and Global Influence',
          slug: 'a-new-chapter',
          excerpt: 'From a rising economy to a stronger global voice, India is shaping a brighter tomorrow with the power of its people.',
          content: '<p>India stands at the precipice of a monumental transformation. As the world\'s most populous nation and one of its fastest-growing major economies, the country is no longer just a participant in the global discourse; it is actively shaping it. This new chapter is characterized by unprecedented growth, relentless innovation, and a significantly amplified global influence.</p><h2>The Economic Engine</h2><p>The economic narrative of India has shifted from potential to performance. Structural reforms, a burgeoning middle class, and a massive demographic dividend are propelling the nation forward. Investments in infrastructure, both physical and digital, are laying the groundwork for sustained expansion.</p><p>Furthermore, the startup ecosystem is booming, creating solutions not just for local challenges but for global ones as well. This entrepreneurial spirit is a key driver of this new era.</p>',
          featured_image_url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
          status: 'published',
          author_id: getAuthorId('thinkbharti-editorial'),
          category_id: getCategoryId('india'),
          published_at: new Date().toISOString()
        },
        {
          title: 'India\'s Digital Rupee: The Future of Currency',
          slug: 'india-digital-rupee-launch',
          excerpt: 'The RBI has officially rolled out the retail digital rupee, signaling a massive shift in how transactions will happen in the near future.',
          content: '<p>The launch of the e₹ marks a historic moment in India\'s financial history. As digital payments have already saturated the Indian market through UPI, the introduction of a Central Bank Digital Currency (CBDC) takes digitization to the sovereign level.</p><p>Unlike UPI, which relies on bank accounts, the digital rupee is physical cash translated into digital form. It offers the same anonymity and finality of a physical transaction.</p><p>Economists predict this will reduce the cost of cash management and open new avenues for programmable money, where funds can be designated for specific end-uses.</p>',
          featured_image_url: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=80',
          status: 'published',
          author_id: getAuthorId('thinkbharti-editorial'),
          category_id: getCategoryId('finance'),
          published_at: new Date().toISOString()
        },
        {
          title: 'Gaganyaan: ISRO\'s Manned Mission Approaches Final Testing',
          slug: 'isro-gaganyaan-mission-update',
          excerpt: 'India\'s ambitious manned spaceflight program, Gaganyaan, has successfully completed its critical thermal tests and is on track for a 2027 launch.',
          content: '<p>The Indian Space Research Organisation (ISRO) announced today that the crew module for the Gaganyaan mission has successfully cleared the grueling thermal and vacuum chamber tests.</p><p>This milestone puts India firmly on the path to becoming only the fourth nation to launch humans into space independently.</p><p>The Vyommitra humanoid robot will fly on the final uncrewed test flight scheduled for late this year, validating life support systems before astronauts take the helm.</p>',
          featured_image_url: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80',
          status: 'published',
          author_id: getAuthorId('rahul-sharma'),
          category_id: getCategoryId('science'),
          published_at: new Date().toISOString()
        },
        {
          title: 'Building Sustainable Cities: India\'s Urban Roadmap for 2030',
          slug: 'sustainable-cities-india-2030',
          excerpt: 'With urbanization accelerating, 10 Indian cities have pledged to become carbon-neutral by 2030 through aggressive green policies.',
          content: '<p>Urbanization in India is occurring at a breakneck pace. To combat the resulting pollution and infrastructural strain, a coalition of 10 tier-1 and tier-2 cities have unveiled their "Green Urban 2030" roadmap.</p><p>Key initiatives include mandating solar panels on all new commercial buildings, transitioning 100% of public transport to electric vehicles, and creating vast urban forests.</p><p>If successful, this model could serve as a blueprint for developing nations worldwide facing similar urbanization challenges.</p>',
          featured_image_url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80',
          status: 'published',
          author_id: getAuthorId('priya-desai'),
          category_id: getCategoryId('environment'),
          published_at: new Date().toISOString()
        },
        {
          title: 'Team India Gears Up for a New Challenge',
          slug: 'team-india-gears-up',
          excerpt: 'With a young and dynamic squad, India looks ready for the next big tournament.',
          content: '<p>The national team has announced its squad for the upcoming tournament, featuring a mix of seasoned veterans and exciting new talent.</p><p>The focus has been on building a balanced team capable of performing in all conditions.</p>',
          featured_image_url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
          status: 'draft',
          author_id: getAuthorId('amit-kumar'),
          category_id: getCategoryId('sports'),
          published_at: null
        }
      ], { onConflict: 'slug' });

    if (postsError) throw postsError;

    return NextResponse.json({ success: true, message: 'Database seeded successfully!' });

  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
