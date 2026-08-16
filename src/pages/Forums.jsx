import { useState } from 'react'
import './Forums.css'

const Forums = () => {
  const [activeTab, setActiveTab] = useState('part-a')
  const [expandedForums, setExpandedForums] = useState({})

  const toggleForumExpanded = (forumCode) => {
    setExpandedForums(prev => ({
      ...prev,
      [forumCode]: !prev[forumCode]
    }))
  }

  const technicalForums = [
    {
      code: 'FA.1',
      title: 'FORUM ON GEOMATERIALS FOR SUSTAINABLE DEVELOPMENT',
      fullDescription: 'The earth provides the greatest quantity of materials that are used for the construction of facilities and provision of services to humanity across several industrial sectors. This forum will focus on the utility, characterization and deployment of geomaterials in support systems for the sustainable development of societies. Both natural and modified geomaterials will be covered in the keynote presentation and panel discussions, among them, soil, rocks, nanomaterials, dredged geomaterials, recycled materials, minerals and geosynthetics. The role of rare minerals in national economic development programs will also be discussed. This special session is jointly organized by the Global Institute for Sustainable Development, Advanced Analyses and Design (GISDAAD), Charlotte, USA; the Environmental Geotechnology Research Group of the Indian Institute of Technology-Bombay (IIT-B), Mumbai, India; and the Geological Engineering Division of the School of Earth Sciences and Engineering of Nanjing University, Nanjing, China.',
      organizers: [
        { name: 'Prof. Hilary I. Inyang (GISDAAD)', email: 'h.inyang26@gmail.com', phone: '+234 814 569 6364' },
        { name: 'Prof. Devendra N. Singh (IIT-B)', email: 'dns@civil.iitb.ac.in', phone: '+91 98207-58508' },
        { name: 'Prof. Chao-sheng Tang', email: 'tangchaosheng@nju.edu.cn', phone: '+86-25-83597888' }
      ]
    },
    {
      code: 'FA.2',
      title: 'FORUM ON ADVANCED GEOMONITORING SYSTEMS',
      fullDescription: 'Geomonitoring systems are essential at various scales in the development and use of infrastructure at the planning, construction, operational and maintenance phases. Both traditional and advanced systems are useful and can be complementary, depending on the type and design of the structural or environmental system involved. Among the several types of sensors used to detect structural failures, material flows/leakages, deformations and chemicals are electro-chemical sensors, fiber-optic sensors, sonic probes, motion detectors, radiation sensors and heat detectors. In this forum which is jointly organized by NanZee Sensing Technology Co. Ltd. of Suzhou, Jiangsu Province, China and United Infrastructure Systems, Ltd of Abuja, Nigeria, the utility of geomonitoring systems will be discussed.',
      organizers: [
        { name: 'Prof. Shi Bin (President, Council)', email: 'shibin@nju.edu.cn', phone: '' },
        { name: 'Mr. Wang Hongxian', email: 'wanghx@nzsensing.com', phone: '' }
      ]
    },
    {
      code: 'FA.3',
      title: 'FORUM ON DAMS, LEVEES AND LARGE-SCALE GEOENVIRONMENTAL INFRASTRUCTURE',
      fullDescription: 'Large-scale structural and geotechnical systems are implemented in many countries to control and utilize water flow in streams, rivers, lakes and ocean fronts. The principal structures are dams, levees, embankments and spillways for flood control, electric power generation, and water conveyance for irrigation or industrial use. This forum will address the utility, challenges and opportunities for improvement and use of this category of infrastructure with advanced materials and monitoring technologies to support sustainable development. This special forum is organized by the Nigerian Hydropower Professional Association (NHPA) and other international agencies.',
      organizers: [
        { name: 'Prof. Shen-En Chen', email: 'schen12@charlotte.edu', phone: '+1 704 305-6866' },
        { name: 'Mr. Imoh Ekpo', email: 'ekpo.imo12@gmail.com', phone: '+234 803 599-5582' },
        { name: 'Dr. Maroof Kola Lawal', email: 'maroofkular@gmail.com', phone: '+234 805 666 7954' }
      ]
    },
    {
      code: 'FA.4',
      title: 'FORUM ON EUROPEAN MINING SYSTEMS',
      fullDescription: 'Europe is a leader in advanced mining systems, covering mineral exploration technology, mine surveys and valuation; excavation technology; mineral characterization and beneficiation techniques; and mineral processing, packaging and sales. This Forum will focus on management of these processes to support increasing global demand for key minerals, some of which are still sourced from Europe. The following Council members will co-chair and organize this forum.',
      organizers: [
        { name: 'Dr. Sue Struthers', email: 'skapa.uk@gmail.com', phone: '' },
        { name: 'Dr. Joze Kortnik', email: 'joze.kortnik@ntf.uni-lj.si', phone: '+386 41 885 690' }
      ]
    },
    {
      code: 'FA.5',
      title: 'FORUM ON COMPUTATIONAL SYSTEMS AND DATA FOR SUSTAINABLE DEVELOPMENT',
      fullDescription: 'Computational sustainability is defined as the "leverage of artificial intelligence, data analytics and mathematical modeling to balance environmental, economic and societal needs." Interactions among relevant parameters are multi-dimensional and complex. They need to be devolved into scalable solutions. As the leading African intellectual organization with an important role in the implementation of the Science, Technology and Innovation Strategy for Africa (STISA) 2034, and the Africa Agenda 2063, the Africa Academy of Science (AAS) is organizing this forum to discuss greater use of computational systems and data centers to support the sustainable development of Africa.',
      organizers: [
        { name: 'Dr. Nkem Khumbah', email: 'n.khumbah@aasciences.africa', phone: '+1 (734) 255-0158' }
      ]
    },
    {
      code: 'FA.6',
      title: 'FORUM ON GEOHAZARDS PREVENTION AND CONTROL',
      fullDescription: 'Geohazards such as earthquakes, mudslides, volcanic eruptions, soil liquefaction, avalanches and landslides threaten built infrastructure, ecological systems and human lives worldwide. As human population grows in land-limited areas, there are growing incursions into zones that have prevalence of geohazards. This Forum which is jointly organized by the Infrastructure and Environmental, Systems (INES) Doctoral Program of the University of North Carolina, Charlotte, USA, and the Emerging Disaster Program of the China University of Mining and Technology Xuzhou, China as well as GISDAAD, Charlotte/Concord, NC, USA, will focus on necessary policies, design measures and other mitigation and control measures to minimize the ravages of geohazards.',
      organizers: [
        { name: 'Prof. Jy Wu', email: 'jwu@charlotte.edu', phone: '+1 704 687-1240' },
        { name: 'Prof. Hilary I. Inyang', email: 'h.inyang26@gmail.com', phone: '+234 814 569 6364' },
        { name: 'Prof. Bian Zhengfu', email: 'bianzhengfu@cumt.edu.cn', phone: '' }
      ]
    },
    {
      code: 'FA.7',
      title: 'FORUM ON REMOTE SENSING, AND ADVANCED SATELLITE MONITORING SYSTEMS',
      fullDescription: 'Many development projects cover very large expanses of space (land, rivers and lakes/seas). Among such structures are rail lines, roads, long-span bridges, funnels, pipelines and cable lines. It is usually necessary to evaluate the characteristics of the terrain and/ or body of water over which the structures will be lain or buried. On-site evaluation systems are usually implemented subsequent to initial airborne remote sensing over large areas during site selection and/or route alignment processes. Satellite monitoring systems are also useful in land use evaluations in forestry, agriculture and pest control, as well as vulnerability assessments. Geographic Information Systems (GIS) can be used in combination with innovative monitoring and surveillance systems to characterize extensive sites geotechnically and analyze hazards and vulnerability of natural and constructed systems with capacity for visualization. In this Forum, panelists will discuss these utilities and others, following a targeted keynote lecture. New technologies will also be discussed.',
      organizers: [
        { name: 'Prof. Keifei Zhang', email: 'profkzhang@cumt.educ.cn', phone: '+61 408 592 891' },
        { name: 'Prof. Wenwu Tang', email: 'WenwuTang@charlotte.edu', phone: '+1 704 687 0731' },
        { name: 'Prof. Bian Zhengfu', email: 'bianzhengfu@cumt.edu.cn', phone: '' }
      ]
    },
    {
      code: 'FA.8',
      title: 'FORUM ON AFRICAN ENERGY TRANSITIONS',
      fullDescription: 'Energy transition is a key issue in Africa as most countries try to transform their energy systems to deal with targeted industrialization and the need to address global climate change. In the case of Africa, equity in energy transitions from traditional energy systems that focus on carbon-powered systems, (particularly, coal) is a critical parameter. In this Forum which is organized by the Human Resources Research Council (HSRC) of South Africa and the University of Johannesburg, the steps that are being taken by South Africa on just energy transition will be discussed.',
      organizers: [
        { name: 'Prof. Thokozani Simelane', email: 'tsimelane@hsrc.ac.za', phone: '+27 79 269 0663' },
        { name: 'Dr. Patrick Ezekiel Itegbeyogene', email: 'itegbeyogene@gmail.com', phone: '+234 903 229 7703' }
      ]
    },
    {
      code: 'FA.9',
      title: 'FORUM ON INNOVATIONS AND OPPORTUNITIES IN THE OIL AND GAS INDUSTRY',
      fullDescription: 'Despite global efforts to decarbonize energy systems in transportation, agriculture and other sectors that require the powering of machines, oil and gas still remain, the primary fuel for operation of machines for the foreseeable future. This circumstance has great impacts on the wealth and geopolitical postures of nations. More and more oilfields are being discovered and developed through deployment of novel exploration and extraction techniques. There is increase in refining and shipments of both raw and refined oil products. Numerous petroleum products service the economies of all countries. In this Forum, a keynote speech and a discussion panel will focus on innovation and opportunities in the oil and gas industry, with the aim of promoting collaboration.',
      organizers: [
        { name: 'Dr. James Eneji Odey', email: 'jamesodey2015@gmail.com', phone: '+234 803 374 7437' },
        { name: 'Mr. Emmanuel Udede', email: 'emman.udedeh@gmail.com', phone: '+234 805 195 4839' }
      ]
    },
    {
      code: 'FA.10',
      title: 'FORUM ON URBAN HOUSING INFRASTRUCTURE DEVELOPMENT AND RELATED INFRASTRUCTURE DEVELOPMENT',
      fullDescription: 'It is estimated that more than one billion people worldwide, live in informal settlements, slums and other overcrowded wards that lack basic amenities, security and sanitation. To meet housing needs by the sunset of the Sustainable Development Goals (SDGs) in 2030, it is estimated that about 96,000 new affordable houses need to be built daily. There is also the global affordability gap, driven by income disparity and growing relative urbanization in the Global South. This Forum will address the global housing crisis with exploration of opportunities and methods of reducing housing costs and improving housing policies in both the developed and emerging countries.',
      organizers: [
        { name: 'Mr. Remi Abolarinwa', email: 'remmsonabolarinwa@gmail.com', phone: '(+234) 703 192 6990' },
        { name: 'Mr. K. Mphengula', email: 'mmphengula@yahoo.com', phone: '(+267) 72 211 118' },
        { name: 'Mr. Kayode Adeosun', email: 'kayodeadosun@yahoo.com', phone: '+234 803 786 8297' }
      ]
    },
    {
      code: 'FA.11',
      title: 'FORUM ON BROWNFIELDS AND MINED LAND RECLAMATION',
      fullDescription: 'Mining and industrial activities have generated wealth to support local, regional and national economies throughout human history. However, some negative impacts on the environment and human health have complemented economic gain from mining and other industrial activities. It is estimated that between 1985 and 2022, surface mining activities alone disturbed more than 40,000 square kilometers of land globally, out of which about 29 square kilometers was reclaimed. Many municipalities are dotted with old and abandoned industrial sites that are polluted as a legacy of material processing operations that have moved elsewhere. These "Brownfields" are being reclaimed for other uses as the scarcity and cost of land in urban areas continue to increase. Many policies and technical systems have been deployed. This forum will focus on land use and rehabilitation policies, biodiversity, conservation, and contaminated site treatment technologies such as bioremediation, grouting, top soil replacement and phytoremediation. This forum is co-organized by the Ecological Research Group of the China University of Mining and Technology (CUMT), Xuzhou, China and GISDAAD, Charlotte, USA/ Abuja, Nigeria.',
      organizers: [
        { name: 'Prof. Bian Zhengfu', email: 'bianzhengfu@cumt.edu.cn', phone: '' },
        { name: 'Dr. Lu Ping', email: 'lupingcumt@126.com', phone: '' },
        { name: 'Prof. Shaogang Lei (CUMT)', email: 'lsgang@126.com or shan45@gmail.com', phone: '' },
        { name: 'Mr. Melkamu Abebe (BDU)', email: 'melka.abebe@gmail.com', phone: '' }
      ]
    },
    {
      code: 'FA.12',
      title: 'FORUM ON ROCK AND SOIL MECHANICAL EXCAVATION TECHNOLOGY FOR TUNNELS PIPELINES, UTILITY CONDUITS AND STORAGE CAVERNS',
      fullDescription: 'Many civil and mining engineering operations involve geomaterial (soil and rock) excavation. Among such operations are aggregate mining; excavation of rock chambers for waste disposal, utility trenches for fluid conduits and power lines; and under cutting of coal beds; construction of oil and gas pipelines; and development of fluid storage caverns in rock. There are two main excavation method for geomaterials: mechanical excavation and blasting, with the former having the advantages of easier control of excavated space dimensions and minimal generation of fugitive dust and fly-rock. Safety considerations in urban areas may rule out blasting. Optimization of geomaterial excavation processes in terms of energy requirements, excavation rates and environmental factors is essential in project feasibility and cost assessments. This Forum will focus on the factors outlined above, as well as the features of various geomaterial fragmentation processes.',
      organizers: [
        { name: 'Prof. Hilary I. Inyang', email: 'h.inyang26@gmail.com', phone: '+234 814 569 6364' }
      ]
    },
    {
      code: 'FA.13',
      title: 'FORUM ON COASTAL MARINE SYSTEMS',
      fullDescription: 'A coastal marine environment is defined as the margin where land contacts saltwater. It is estimated that the total length of marine coastlines globally is about 0.62 million Kilometers. Put in perspective, that length is about 15 times the length of the equator of about 29.7 million square kilometers (20%) of the earths total land surface. Costal zones hold 40% of the global population (about 2.4 billion). Coastal marine zones are areas of dense population, prolific infrastructure development, high economic development activities, sensitive environmental systems and fast-changing climatic factors. This forum which organized by the Africa Vice- Presidency of the Council in collaboration with the Faculty and Institute of Oceanography of the University of Calabar, Nigeria, the Africa Center of Excellence for Wastes to Energy Studies of the Federal University of Environment and Technology, Koroma /Saakpenwa, Nigeria and GISDAAD, Charlotte, USA, will address the importance of geohydrological, climatic and socioeconomic factors of coastal marine systems and the hazards that need to be addressed through policy and technical systems.',
      organizers: [
        { name: 'Prof. Effiom E. Antia', email: 'e_antia@yahoo.co.uk', phone: '+234 803 706 4846' },
        { name: 'Prof. Hilary I. Inyang', email: 'h.inyang26@gmail.com', phone: '+234 814 569 6364' },
        { name: 'Dr. Fidelis Abija', email: 'fidelabija@yahoo.co.uk', phone: '+234 803 896 2622' }
      ]
    },
    {
      code: 'FA.14',
      title: 'FORUM ON ICT AND ARTIFICIAL INTELLIGENCE (AI) FOR SUSTAINABLE DEVELOPMENTS',
      fullDescription: 'The Fourth Industrial Revolution (41R) comprises Internet of Things (IOT), Artificial Intelligence, Big Data Centers and Analytics, Robotics, Nano-systems and Space-based Sensing, in its most comprehensive definition. The capacity and performance of each country or global region on a combination of the utilities mentioned above, will continue to determine her stealth, health and wealth in the foreseeable future. They all impact sustainable development beyond the sunset year of the United Nations. This Forum will focus on the features, roles and necessary implementation schemes of these innovative technologies within the context of sustainable development at all jurisdictional scales.',
      organizers: [
        { name: 'Prof. John Justus Okon', email: 'jjokon@gmail.com', phone: '+18455360826' },
        { name: 'Mr. Marshall Anako', email: 'marshallanako@gmail.com', phone: '+1 623 570 8306' }
      ]
    },
    {
      code: 'FA.15',
      title: 'FORUM ON CLIMATE CHANGE ON THE ENVIRONMENT AND LIVELIHOOD IMPACTS',
      fullDescription: 'Human livelihood is threatened by climate change globally through infrastructure destruction economic destabilization, degradation of natural resources, threats to human health and rain fed agriculture; and generated hazards such as aggressive tidal waves, floods and associated destruction of habitats. Improved enlightenment about the nexus among climate change generation and impact factors will lead to better planning and implementation of both mitigation and adaptation schemes and projects to improve resilience to climate change at all scales. The Forum will focus on policy measures, technical systems and economic schemes that can improve the resilience of society to climate change.',
      organizers: [
        { name: 'Prof. John Osonwa', email: 'johnosonwa@gmail.com', phone: '+234 815 519 0656' }
      ]
    },
    {
      code: 'FA.16',
      title: 'FORUM ON GEOTHERMAL SYSTEMS, GAS TRANSPORT AND CARBON CAPTURE AND STORAGE',
      fullDescription: 'This forum will examine the role of geothermal energy systems, subsurface gas transport processes, and carbon capture and storage technologies in advancing low-carbon development and environmental resilience. The discussion will cover technical methods, field applications, policy frameworks, and opportunities for implementation across diverse geologic settings.',
      organizers: [
        { name: 'Prof. Chao-Sheng Tang', email: 'tangchaosheng@nju.edu.cn', phone: '+86-25-83597888' },
        { name: 'Prof. Hilary I. Inyang', email: 'h.inyang26@gmail.com', phone: '+234 814 569 6364' }
      ]
    },
    {
      code: 'FA.17',
      title: 'FORUM ON BIOGEOTECHNOLOGY AND ECOLOGICAL RESTORATION',
      fullDescription: 'This forum will focus on the use of biotechnological tools and ecological restoration strategies to rehabilitate affected landscapes, improve ecosystem services, and support long-term sustainability in both urban and rural environments.',
      organizers: [
        { name: 'Prof. Shen-En Chen', email: 'schen12@charlotte.edu', phone: '+1 704 305-6866' },
        { name: 'Dr. Fidelis Abija', email: 'fidelabija@yahoo.co.uk', phone: '+234 803 896 2622' }
      ]
    }
  ]

  const policyForums = [
    {
      code: 'FB.1',
      title: 'FORUM ON INTERNATIONAL SCIENCE DIPLOMACY, AND SCIENCE FOR PEACE',
      fullDescription: 'Global sustainable development is threatened by ineffectiveness and lack of diplomacy in ways that lead to socio-political, economic and military conflicts among countries and regions. These conflicts have led to economic devastation and lowering of human potential in many communities and regions of the world. Any human activity that can convene tribes, communities and nations across political philosophies, religions, gender, socio-economic, status and nationalities for humanity`s good is desirable. Science, the systemic search for the nature of things and events for possible use in support of livelihoods, is a tool that can be used more in sustainable development efforts. Science diplomacy involves extension and sharing of scientific utilities. In practical terms within the context of sustainable development, science diplomacy covers joint research/investigations, joint expeditions, co-authorships, debates in science, seminars, provision of evidence for resolution of claims and other science-based resolutions by diverse sets of organizations to defuse political and socio-economic tensions and conflicts for humanity`s sake.',
      organizers: [
        { name: 'Prof. Hilary I. Inyang (GISDAAD)', email: 'h.inyang26@gmail.com', phone: '+234 814 569 6364' },
        { name: 'Prof. Lise Korsten', email: 'lise.korsten@up.ac.za', phone: '+27 (0)12 420 3295' },
        { name: 'Prof. Thokozani Simelane', email: 'tsimelane@hsrc.ac.za', phone: '+27 79 269 0663' }
      ]
    },
    {
      code: 'FB.2',
      title: 'FORUM ON GLOBAL PEACE, DIPLOMACY AND SOCIOECONOMIC DEVELOPMENT',
      fullDescription: 'Sustainable development is not possible in an environment that is ravaged by frequent conflicts and wars. The United Nations and many economic bloc organizations have developed mechanisms for facilitation of diplomatic solutions to conflicts among nations and regions. Among such mechanisms are those of the Association of Southeast Asian Nations (ASEAN), the African Union (AU), the European Union (EU), the Organization of American States (OAS), the Community of Latin American and Caribbean States (CELAC) as well as Switzerland. The primary instruments are negotiation, dialogue and mediation. This Forum will cover the use of these instruments to defuse international and regional conflicts that can constrain sustainable development.',
      organizers: [
        { name: 'Dr. Xiaoshun Qin', email: 'xiaoshun.qin.SA@gmail.com', phone: '+27 72 792 3988' },
        { name: 'Prof. Hilary I. Inyang (GISDAAD)', email: 'h.inyang26@gmail.com', phone: '+234 814 569 6364' }
      ]
    },
    {
      code: 'FB.3',
      title: 'FORUM ON EDUCATION FOR SOCIETAL SUSTAINABLE DEVELOPMENT',
      fullDescription: 'Education which can be defined as the process and methodologies for empowering the mind, is a standalone goal (Goal 4) of the United Nations Sustainable Development Goals (SDGs) 2030 which targets inclusive and equitable education for all. It also permeates all other SDGs. Globally, SDGs require integration of learning, skill and knowledge systems, from Indigenous Knowledge Systems (IKS) to novel knowledge systems. At the level of individuals, education should extend human cognitive, socio-emotional and behavioral capacities. As regards support systems, there is the necessity to improve educational facilities, equipment, management processes, curricula and entrepreneurship support systems for educational institutions. This Forum will focus on appraisal of all the issues mentioned above by a panel of experienced personnel who will interact with other participants.',
      organizers: [
        { name: 'Mr. Miguel Gonzalez', email: 'miguel4.gonzalez@gmail.com', phone: '+251 7130 21831' },
        { name: 'Mr. Daniel King Ebong', email: 'anyinbasi1@gmail.com', phone: '+234 806 834 1717' }
      ]
    },
    {
      code: 'FB.4',
      title: 'FORUM ON FAITH PARAMETERS OF SUSTAINABLE DEVELOPMENT',
      fullDescription: 'Sustainable development covers and is fed by religious faith elements, from the construct of societal laws, most of which have evolved from religious principles, to direct education of citizens in faith-based institutions. It is estimated that 80% of the global population is attached to religious beliefs directly and informally with impacts on societal values, social justice and environmental stewardship. Religious groups have also been engaged in mobilization of grass root resources for education and poverty alleviation. Inter-faith collaboration supports sustainable development through conflict resolution, enfranchisement and enlightenment of congregations. This important Forum will be chaired and moderated by Pastor Femi Lazarus with intent on producing a documentary for later broadcasts globally.',
      organizers: [
        { name: 'Pastor Femi Lazarus', email: 'femilazarus18@gmail.com', phone: '' },
        { name: 'Ms. Margaret Ogbolu', email: 'margaretogbolu@gmail.com', phone: '+234 905 583 0484' }
      ]
    },
    {
      code: 'FB.5',
      title: 'FORUM ON SOCIAL SYSTEMS, HERITAGE AND SUSTAINABLE DEVELOPMENT',
      fullDescription: 'Although consensus is difficult to reach on the impacts of social systems and heritage on sustainable development on societies, examples can be cited to support different sides of the issue. Aspects pertain to sizes of individualism, collective farming, centralized versus dispersed governance systems as well as the role of custom on acceptance of innovation. This Forum will focus on discussions of these factors within the context of sustainable development of societies.',
      organizers: [
        { name: 'Dr. Rita S. Senise', email: 'rsenise@usp.br', phone: '' },
        { name: 'Prof. Leticia Galluzzi', email: 'galluzzi@nce.ufrj.br', phone: '+55 21 3938-3324' },
        { name: 'Dr Tompson Makahamadze', email: 'tompsmakah@gmail.com', phone: '+1 540 931 5782' }
      ]
    },
    {
      code: 'FB.6',
      title: 'GLOBAL YOUTH SUSTAINABLE DEVELOPMENT FORUM',
      fullDescription: 'Within the global population of 8 billion people, about 1.8 billion people are between the ages of 10 and 24, constituting about 16%. With respect to designation, the "youth" age range, there is no universal convention but "youth" typically applies to the age range of 18-45 years in demographic planning process of countries. Youth in the categorization scheme of the World Health Organization applies to the age range of 15-24 years. Research in neuroscience indicates that the prefrontal cortex of the brain which is the segment that controls management proficiency and option selection, continues to mature through adolescence years (10-19 years) into the early stages of a person`s adulthood. Youth are considered to be agents of change, advocates and monitors of societal improvement organizations, digital innovators and future leaders. Their altruistic aspirations and engagement are essential to sustainable development sectors such as environmental stewardship; mobilization to support social equity and peace; and innovations in fashion, arts and entertainment. This Forum will focus on opportunities and challenges of expanding the engagement of youth in sustainable development in various global regions.',
      organizers: [
        { name: 'Ms. Tracey Uzoigwe', email: 'livingearth.tracy@gmail.com', phone: '+234 703 751 9110' }
      ]
    },
    {
      code: 'FB.7',
      title: 'FORUM ON LEGAL SYSTEMS, GOVERNANCE AND SUSTAINABLE DEVELOPMENT',
      fullDescription: 'Sustainable development initiatives and projects are planned and implemented under different governance and legal systems in different countries. This situation relates to the four critical parameters of program implementation: jurisdictional authority, legality, allocated budget (financing) and implementation schedule (time). Some programs such as climate change mitigation, large-scale disaster management operations, global air pollution monitoring, pandemics control, international air traffic control, and marine ecological protection are at multi-national scales and need multi-lateral cooperation and management systems. This Forum will focus on the mechanisms for reconciling jurisdictional and governance system challenges to effectively and efficiently address global geo-environmental and sustainable development challenges.',
      organizers: [
        { name: 'Prof. Cyprian Edward-Ekpo', email: 'cyprian.edward@ilawdun.us', phone: '+234 803 896 6860' },
        { name: 'Ambassador Rabiu Dagari', email: 'rdagari@yahoo.co.uk', phone: '+234 706 835 3236' }
      ]
    },
    {
      code: 'FB.8',
      title: 'FORUM ON AQUIFERS AND SURFACE WATER RESOURCES',
      fullDescription: 'The latest edition of the State of Global Water Resources (for 2024 released in 2025) developed by the World Meteorological Organization (WMO) indicates a record of heat, climate extremes and proliferation of water-related impacts globally. Global surface temperatures reached 1.55 degrees centigrade above preindustrial levels, making 2024 the hottest year in more than a century and a half. While ravaging floods occurred in many regions, such as central Europe, West Africa, East Africa and some parts of Asia, drought were experienced in South America and South Africa. Glaciers lost more ice, resulting in sea level increase. About 60% of catchment areas globally had abnormal river discharges. These abnormalities extended to groundwater levels. Only 38% of monitored water wells had normal levels. The rest experienced severe depleted or extremely high water levels. Obviously, there are inter-linkages among hydrological conditions, water security, economic development and peace in both river basins and drylands globally, especially in countries of the Global South. In this Forum, regional water availability and quality issues will be discussed by a panel of experts following a keynote lecture on the issue.',
      organizers: [
        { name: 'Prof. Olago Daniel', email: 'dolago@uonbi.ac.ke', phone: '' },
        { name: 'Prof. Aniekan Edet', email: 'aniekanedet@yahoo.com', phone: '' }
      ]
    },
    {
      code: 'FB.9',
      title: 'FORUM ON GLOBAL NATURE RESERVES AND ZOOS',
      fullDescription: 'Nature reserves have various alternative names: wildlife preserve, wildlife sanctuary, wildlife refuge, etc. Usually, it is an area of critical flora, fauna, funga or geological features that are conserved to serve the population presently or in the future. Animals are kept in zoos (enclosures) for exhibition or research or conservation. The Wildlife Conservation Society (WCS) and the World Wildlife Fund (WWF) implement many programs on science, public education and enlightenment, conservation action and environmental stewardship to promote sustainable development. The utility of such programs, including ecotourism, will be discussed in this Forum.',
      organizers: [
        { name: 'Prof. Edem Eniang', email: 'edemeniang@uniuyo.edu.ng', phone: '+234 708 888 1313' }
      ]
    },
    {
      code: 'FB.10',
      title: 'FORUM ON DRINKING WATER AND PUBLIC HEALTH',
      fullDescription: 'There is a strong relationship between drinking water quality and human health. This nexus is driven by several microbiological, chemical and physiological factors that pertain to the drinking water and human body. Safe drinking water is a critical factor in human health. Contaminated water is implicated in many diseases such as typhoid, dysentery, cholera and typhus, with significant impacts on human productivity and mortality in many parts of the world. Some examples of the sources and mechanisms of drinking water contamination are leaching of chemicals such as arsenic, fluoride, chromium and pathogens into boreholes; acid mine drainage; and acid rain into water bodies that supply untreated drinking water. Chemical contamination of drinking water sources can also result from many industrial activities. Thus, communities must utilize monitoring guidelines such as those of the World Health Organization (WHO) to develop water safety plans; and implement cost-effective drinking water treatment systems to safeguard public health. These management and technical systems will be discussed in this Forum.',
      organizers: [
        { name: 'Dr. Chukwumezie Okolo', email: 'drmezieokolo@gmail.com', phone: '+234 916 065 1776' },
        { name: 'Pharm. Beatrice Obiageli Mbah', email: 'bettyobby@gmail.com', phone: '+234 818 818 8623' }
      ]
    },
    {
      code: 'FB.11',
      title: 'FORUM ON WAR AND THE ENVIRONMENT',
      fullDescription: 'The global distribution of armed conflicts is uneven although there are about 130 ongoing conflicts that involve 60 countries. These conflicts cover both state and non-state organizations and devastate environmental systems. Although most of the wars are fought in the Middle East, Sub-Saharan Africa, Eastern Europe and some parts of South Asia, arms manufacture and military preparedness operations elsewhere, also contribute significantly to environmental damage. Conflicts damage ecosystems; pollute water resources, land and air; and plant hazards such as land and sea mines as well as long-living radioactive substances. Even before the onset of physical war, development and sustenance of armed forces with their associated facilities and "war games", involve largescale mining of critical minerals with accompanying dereliction of land; armament production in military industrial installation and arms testing facilities, all of which release pollutants into the environment. It is estimated that military land covers up to 6% of the global land surface. During active wars, oil and other industrial chemicals are spilled through bombing of installations, naval battles and biological toxin sprays and pipeline destruction. In some cases, chemical warfare has been practiced with the consequence of large-scale ecological damage. In this forum, Prof. Hilary I. Inyang will present a keynote speech and lead both a panel discussion and interaction with participants on the impacts of war on the environment.',
      organizers: [
        { name: 'Prof. Hilary I. Inyang', email: 'h.inyang26@gmail.com', phone: '+234 814 569 6364' },
        { name: 'Dr. Ambrose Isibor', email: 'ambrose@comfortrecruitmentltd.com', phone: '+44 7478 067302' }
      ]
    },
    {
      code: 'FB.12',
      title: 'FORUM ON ENTREPRENEURSHIP ENFRANCHISEMENT AND TRADE',
      fullDescription: 'Living standards and sustainable development of societies can be enhanced by improvements in entrepreneurship enfranchisement, and trade. Entrepreneurship thrives on innovation and generates jobs through engagement of talented labor. Enfranchisement at an extended scale, spreads value chains across countries. Trade expands markets for produced goods, including surplus goods from local industries, and allows access to foreign resources and produced goods. Tariffs and other trade factors affect trade in geomaterials, agricultural products and fabricated materials. Minerals, cement, oil and gas and other commercial wares are examples. Interruptions in the supply chain that may be caused by conflicts, can spur the search for alternatives through research, direct material substitution or change of supply sources with attendant changes in spatio-temporal distribution of hazards and risks. For example, switching of oil shipping routes due to geopolitical conflicts can determine the pattern of oil spillages in the sea. This Forum will focus on the salient factors of entrepreneurship enfranchisement and trade, and their impacts on sustainable development.',
      organizers: [
        { name: 'Dr. McPhearson', email: 'macfredileogben@gmail.com', phone: '+234 802 341 8724' },
        { name: 'Mr. Ahmed Ismaila', email: 'ahmadkugal@gmail.com', phone: '+234 809 622 3085' },
        { name: 'Ms. Evin Umanah', email: 'evin.gisdaad@gmail.com', phone: '+234 802 331 0809' }
      ]
    },
    {
      code: 'FB.13',
      title: 'FORUM ON AGRICULTURE VALUE CHAIN AND FOOD SECURITY',
      fullDescription: 'Human civilization has been driven by agriculture for millennia. It provides livelihood and food security for billions of people globally. Over several centuries, innovative techniques have been introduced into agriculture. Among them are soil tillage, nutrient addition, irrigation and mechanized cultivation. On the seed development side, organically modified seeds have been controversially introduced. Beyond nutrition and food security, agriculture has supplied numerous raw materials for the manufacture of critical products for other industrial sectors in the forms of polymers, fibers, oils, chemical catalysts and fuels. However, many issues in agriculture still remain to be fully addressed. Among them are organically modified crops, machine-human labor substitution, raw versus processed crop export, standardization of products for export, climate change impacts on agriculture, empowerment of local farmers, and engagement of youth in agriculture. These issues and others will be discussed in this Forum.',
      organizers: [
        { name: 'Dr. Peter Chinedu Nwachukwu', email: 'nedupeters@gmail.com', phone: '+234 803 797 4101' },
        { name: 'Ms. Chinatu Orji', email: 'chinatuorji78@gmail.com', phone: '+234 813 510 0015' }
      ]
    },
    {
      code: 'FB.14',
      title: 'FORUM ON BUSINESS AND DEVELOPMENT FINANCE',
      fullDescription: 'The four critical pillars of sustainable development are economic development, environmental stewardship, population management and social equity. Invariably, these pillars require financial investments in enabling programs and projects without which desirable impacts will not be achieved. These investments can be in the forms of direct loans, investor contributions, grants, cooperative funds and venture-capitalist funds. Local, regional and international banking institutions should increase financing of development compacts, especially, at local levels for support of innovation and job creation financing. The role of banks, chambers of commerce and cooperatives in financing sustainable development programs and projects will be discussed in this Forum. Processes of investor solicitation and assessments by financing institutions will be discussed with examples of recently planned infrastructure development, agriculture and oil sector development projects in West Africa.',
      organizers: [
        { name: 'Prof. John Ifediora', email: '', phone: '+1 608 772 8843' },
        { name: 'Chief Joseph Akpan', email: 'joeakpaninyang@gmail.com', phone: '+234 814 344 0365' },
        { name: 'Mr. Joseph Habib Sule', email: 'info@jhsdredging.com', phone: '+234 803 376 8147' },
        { name: 'Mrs, Cornelia Akpan', email: 'corneliaakpan497@gmail.com', phone: '+234 803 361 5947' }
      ]
    }
  ]

  const specialSessions = [
    {
      code: 'OSS.1',
      title: 'IMEG EXPOSITIONAL SPECIAL SESSION',
      organization: 'International Society of Environmental Geotechnology (Council)',
      fullDescription: 'The International Society of Environmental Geotechnology is an international professional organizations that is a multidisciplinary organization dedicated to solving global environmental challenges through advanced engineering practices. The international society bridges technical earth sciences with social science policy to address critical geo-ecosystem issues. Since establishing its international symposium series, the Council has coordinated cross-border research, academic forums, and field demonstrations focused on contaminated site remediation, geohazard mechanics, climate change adaptation, and sustainable development frameworks. By connecting academics, engineers, and regulators across its major regional hubs, the society translates raw subsurface data into actionable environmental policies and green engineering solutions. It is one of the major organizers of this IMEG-GSD 2027 Mega Symposium. Its membership is open to all professionals in the earth sciences, geoengineering fields, ecological and environmental fields as well as intersections of these fields with other disciplines that pertain global sustainable development. The Council was co-founded by Prof. Hilary I. Inyang and Prof. Hsai Yai Fang at the University of Massachusetts in 1996 and later registered as a bonafide international professional society with its global headquarters at the University of North Carolina Charlotte in 2004 with Prof. Hilary I. Inyang as its first President. The Council is presently headquartered in Nanjing University in Nanjing, China with Prof. Shi Bin of Nanjing University and Prof. Chao-Sheng Tang of the same university as President and Secretary-General, respectively. In this session, Council leaders will review the history of the organization and welcome new members into the Council with information on future plans of symposia, special editions of journals, webinars, special study and research opportunities and other benefits.',
      organizers: [
        { name: 'Prof. Chao-Sheng Tang', email: 'tangchaosheng@nju.edu.cn', phone: '+86-25-83597888' },
        { name: 'Prof. Zhixiong Zeng', email: 'zhixiongzeng@nju.edu.cn', phone: '' }
      ]
    },
    {
      code: 'OSS.2',
      title: 'AFRICA INSTITUTE OF SOUTH AFRICA AND BRICS EXPOSITION SPECIAL SESSION',
      organization: 'Africa Institute of South Africa (AISA) / HSRC',
      fullDescription: 'The Africa Institute of South Africa (AISA) is a premier research institute and think tank dedicated to the socioeconomic, political and historical study of the African continent. Headquartered in Pretoria, South Africa, it was established in 1960. It combines scholarly research with policy analyses to promote unity, peace, development, and democracy across Africa. It collaborates with BRICS, the international organization that links Brazil, Russia, India, China and South Africa (BRICS) and has for several years embarked on global sustainable development initiatives and projects. At the Human Sciences Research Council (HSRC) of South Africa which is the host of AISA, new initiatives are being developed to promote sustainable development of particularly the Global South. In this special session, program leaders from HSRC will exhibit these initiatives through presentations and discussion with the objective of promoting collaboration with other organizations within and outside Africa. Interested persons are urged to register for this Mega-Symposium at: https://www.imeg-gsd.com.ng/.',
      organizers: [
        { name: 'Prof. Charles Hongoro', email: 'CHongoro@hsrc.ac.za', phone: '+27 66 006 5123' },
        { name: 'Dr. Wilfred Lunga', email: 'WLunga@hsrc.ac.za', phone: '+27 066 073 2199' }
      ]
    },
    {
      code: 'OSS.3',
      title: 'DISASTERS AND REVIVAL OF THE GLOBAL ALLIANCE OF DISASTER REDUCTION (GADR) SPECIAL SESSION',
      organization: 'Global Alliance of Disaster Reduction (GADR)',
      fullDescription: 'GADR is a diverse, international, non-governmental organization (NGO) that networked more than 1000 professionals and 100 supporting organizations in 70 countries between 2004 and 2013. GADR which was headquartered at the Global Institute for Energy and Environmental Systems (GIEES) of the University of North Carolina-Charlotte, NC, USA, was established in 2001 with the mission of facilitating global cooperation, communication, coordination and collaboration among United Nations agencies, academia, and public and private organizations that have missions and programs relevant to natural and technological hazards. The organization was officially certified in 2003. It comprises administrators, policymakers, educators, researchers, technologists and emergency service officers from government agencies, the private sector and NGOs. Their responsibilities and interests embrace the reduction of disasters from natural and technological hazards and introduction of cost-effective disaster reduction concepts into programs for sustainable development, disaster-resilient communities and environmental management. In this special session, the history and utility of GADR will be discussed in the context of the increasing frequency and severity of natural and technological disasters. A plan for revival of GADR into a much stronger international organization will be presented. Interested persons are urged to register for this Mega-Symposium at: https://www.imeg-gsd.com.ng/.',
      organizers: [
        { name: 'Prof. Hilary I. Inyang, President GADR', email: 'h.inyang26@gmail.com', phone: '+234 814 569 6364' },
        { name: 'Prof. Shen-En Chen', email: 'schen12@charlotte.edu', phone: '+1 704 305-6866' }
      ]
    },
    {
      code: 'OSS.4',
      title: 'AFRICAN ACADEMY OF SCIENCE (AAS) SPECIAL SESSION',
      organization: 'African Academy of Sciences (AAS)',
      fullDescription: 'The African Academy of Sciences (AAS) is a non-aligned, non-political, not-for-profit pan-African organization headquartered in Nairobi, Kenya, established in 1985 to drive sustainable development through science, technology, and innovation (STI). Located at 8 Miotoni Lane, Karen, it recognizes excellence, acts as a think-tank, and implements STI programs across Africa. This session is aimed at presenting the aims, objectives and programs of the AAS including its fellowship requirements, operational protocols, international initiatives and engagements, and support for youth, women and continental development programs. Interested persons are urged to register for this Mega-Symposium at: https://www.imeg-gsd.com.ng/.',
      organizers: [
        { name: 'Dr. Nkem Khumba', email: 'n.khumbah@aasciences.africa', phone: '+1 (734) 255-0158' },
        { name: 'Dr. James Mushori', email: 'jameskenya23@yahoo.com', phone: '+254 721 397073' }
      ]
    },
    {
      code: 'OSS.5',
      title: 'ESTABLISHMENT OF ADWA VICTORY PAN-AFRICAN UNIVERSITY (AVPU) SPECIAL SESSION',
      organization: 'AVPU Steering Committee',
      fullDescription: 'This special session at IMEG-GSD 2027 is the launching pad for establishment of the Adwa Victory Pan-African University (AVPU). The Adwa Victory pan-African University is a proposed Pan-African institution inspired by the 1896 Adwa Victory, a historic symbol of African unity and resistance against colonialism. The university aims to promote African-centered education, research, innovation, and leadership while advancing indigenous knowledge and intellectual sovereignty across Africa and the diaspora. In 1924, the Adwa Great African Victory Association (AGAVA) was founded to celebrate the Adwa Victory Anniversary at squares, museums, parks, heritage sites libraries, schools, scholarships, universities, statues, films, and a handbook translated and published in different languages. The project also supports the goals of the African Union Agenda 2063 and the UN Sustainable Development Goals for Africa by fostering continental integration, innovation, and intellectual independence. Through partnerships with organizations such as the African Union, African Development Bank, UNESCO, and UNDP, the Adwa Pan-African University seeks to become the intellectual backbone of Africa\'s "second liberation." It\'s evolving continental steering Committee co-chaired by Prof. Mammo Muchie and Prof. Hilary I. Inyang with Prof. Thokozani Simelane as Executive Director. This session will focus on the historical background of the Ethiopian and indeed, African victory at the Battle of Adwa in 1896; and the mission, vision, organizational structure, mode of operation, financing plan and key institutes of AVPU; and the schedule of activities that will lead to the establishment of AVPU. Organizations and individuals who are interested in joining the effort on the establishment of AVPU are requested the AVPU Secretariat.',
      organizers: [
        { name: 'Prof. Mammo Muchie', email: 'mammo.muchie@gmail.com', phone: '+27 6619 72627' },
        { name: 'Prof. Hilary I. Inyang', email: 'h.inyang26@gmail.com', phone: '+234 814 569 6364' },
        { name: 'Prof. Thokozani Simelane', email: 'tsimelane@hsrc.ac.za', phone: '+27 79 269 0663' }
      ]
    },
    {
      code: 'OSS.6',
      title: 'AFRICAN NETWORK OF WOMEN ENTREPRENEURS\' INITIATIVE (ANWEI) SPECIAL SESSION',
      organization: 'ANWEI (African Network of Women Entrepreneurs Initiative)',
      fullDescription: 'This session is organized by the African Network of Women Entrepreneurs Initiative (ANWEI–Nigeria) to showcase the vision, mission and strategic plans of the organization in recognition of the critical role that female African entrepreneurs need to play in sustainable development of Africa toward achievement of Africa Agenda 2063. ANWEI is a non-profit, non-political, pan-African organization established to promote the economic empowerment of women across Africa through entrepreneurship, financial inclusion, and strategic partnerships. ANWEI was founded to unite women who share common ideals and to foster strong bonds of understanding, collaboration, and solidarity among women entrepreneurs, investors, and professionals. The organization exists to address long-standing challenges faced by African women, particularly limited access to capital, inadequate entrepreneurial support, and exclusion from mainstream economic opportunities. Our work focuses on encouraging and strengthening female entrepreneurship by providing practical support, resources, training, and tools required for the development, growth, and sustainability of women-led businesses. ANWEI actively promotes diversity, inclusion, and equity within the African entrepreneurial ecosystem while amplifying the economic contributions of ANWEI. Interested organizations and individuals who would like to sponsor ANWEI in general and this special session in particular are requested to register for this Mega-Symposium at: https://www.imeg-gsd.com.ng/.',
      organizers: [
        { name: 'Amb. Lady Ola-Rose Ironkwe - Country Rep', email: 'rosieironkwe@gmail.com', phone: '+234 803 267 4204' },
        { name: 'Josephine Mwuese Ejimah', email: 'Joejimah@gmail.com', phone: '+234 815 500 0027' }
      ]
    },
    {
      code: 'OSS.7',
      title: 'THE INTERNATIONAL FORUM FOR PEACE AND DIPLOMACY (IFPD) SPECIAL SESSION',
      organization: 'International Forum for Peace and Diplomacy (IFPD)',
      fullDescription: 'The International Forum for Peace and Diplomacy (IFPD) is an active global, non-partisan diplomatic organization focused on fostering peace, dialogue, and sustainable development, with significant activity in Nigeria. Led by Director General Amb. Michael Timothy Adeniran, the organization focuses on youth inclusion, education, and security. By prioritizing education, media communication, and cultural preservation, the IFPD serves as a vital platform for track-two diplomacy, empowering the next generation of African leaders to build resilient, peaceful communities. This event will focus on the strategic plan, operational structure and format of the new international organization. Particularly, the organization welcome partners and fellows into its fold. It looks forward to collaboration with other organizations. Interested persons are urged to register for this Mega-Symposium at: https://www.imeg-gsd.com.ng/.',
      organizers: [
        { name: 'Amb. Michael Timothy Adeniran', email: 'madeniran@intfpd.org', phone: '+234 813 993 6902' },
        { name: 'Mr. Miguel Gonzalez', email: 'miguel4.gonzalez@gmail.com', phone: '+251 7130 21831' }
      ]
    },
    {
      code: 'OSS.8',
      title: 'JOBS FOR AFRICA NOW (JFAN) OUTREACH SESSION',
      organization: 'Jobs for Africa Now (JFAN)',
      fullDescription: 'JFAN was conceived as a multi-community, self-help socio-economic operating system designed to function centrally across all 55 countries of Africa, supported by culturally grounded national chapters and coordinated regional conferences. Beyond the continent, JFAN also maintains a robust global presence through Global African Diaspora (GAD) Conferences of Chapters, spanning communities of Africans living and working outside Africa. JFAN is presently consolidating its academic, technical and human-resource capacities in preparation for the full constitution of its program leadership at community and national levels. These structures will in turn, aggregate into standing Board of Trustees, Guardians and Leaders. In its final evolution form, JFAN is intended to emerge as a substantive International Inter-Governmental Organization. Its parent company, IQ Ent., will continue to staff, steward and advance its developmental mission, contributing strategically to its leadership, institutional stability and global sustainability. Interested persons are urged to register for this Mega-Symposium at: https://www.imeg-gsd.com.ng/ and contact the JFAN Executive Director or the associates listed below.',
      organizers: [
        { name: 'Amb. IDAH Onyilokwu Kingsley David', email: 'Jobs4africanow@gmail.com', phone: '+234 704 283 4725' },
        { name: 'Queen Amina', email: 'queenaminatv@gmail.com', phone: '+234 806 629 2006' }
      ]
    },
    {
      code: 'OSS.9',
      title: 'FUTURE EARTH AFRICA HUB SPECIAL SESSION',
      organization: 'Future Earth Africa Hub',
      fullDescription: 'This special session will showcase the strategic initiatives, research partnerships, and sustainability programs being advanced by the Future Earth Africa Hub in support of African and global development priorities. The session will highlight collaboration opportunities for researchers, institutions, policymakers, and development partners.',
      organizers: [
        { name: 'Prof. Faten Bahar', email: 'faten.bahar@gmail.com', phone: '+27 79 269 0663' },
        { name: 'Dr. Daniel Nyanganyura', email: 'daniel.nyanganyura@futureearth.org', phone: '+27 12 420 0000' }
      ]
    },
    {
      code: 'OSS.10',
      title: 'INTERNATIONAL CENTER FOR COMMUNITY DEVELOPMENT (ICCD) SPECIAL SESSION',
      organization: 'International Center for Community Development (ICCD)',
      fullDescription: 'This session will present the community development programs, partnerships, and outreach initiatives of the International Center for Community Development, with emphasis on sustainability, education, youth engagement, and institutional collaboration in Africa and beyond.',
      organizers: [
        { name: 'Dr. Theresa Isibor', email: 'tnisibor@iccdconcord.org', phone: '+1 704 305-6866' },
        { name: 'Dr. Helen Ajuzieogu', email: 'helen.gisdaad@gmail.com', phone: '+234 806 394 7292' }
      ]
    }
  ]

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Forums & Special Sessions</h1>
          <p>Knowledge Exchange and Collaborative Discussions at IMEG-GSD 2027</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="forums-intro">
            <h2>Symposium Forums</h2>
            <p>
              The IMEG-GSD 2027 Mega Symposium features comprehensive forums structured in an integrated format, 
              covering environmental geotechnology, policy, and sustainable development. Experts from around 
              the world will present research, lead discussions, and share innovations.
            </p>
            <p>
              Several notable organizations and experts are collaborating with the International Organizing Committee
              of IMEG-GSD 2027 Mega-Symposium to organize SPECIAL FORUMS to discuss important sustainable
              development issues. These Special Forums are organized mostly independently by their designated
              co-chairs/co-organizers with guidance by the leadership of the Mega-Symposium. Each Forum comprises:
              opening remarks by the co-chairs/co-organizers (10 minutes); followed by a keynote lecture/speech
              (20 minutes) by a speaker that must be selected independently by the session organizers; a panel
              discussion by five speakers on the stage (60 minutes); followed by a moderated and interactive/question
              & answer part (20 minutes) with the final 10 minutes of closure remarks by the co-chairs/co-organizers.
              The proceedings of the forums will be recorded for later editing and broadcasts on television and social
              media networks. In the tables provided below, the SPECIAL FORUMS are briefly described with information
              on the designated co-chairs/co-organizers. Interested participants in any of the Forums described below
              are urged to register for the Mega-Symposium at the website: https://www.imeg-gsd.com.ng to attend
              the Forum. Participants who want to serve as discussion panelists or keynote speakers at any of the
              described Forums should directly contact the listed co-chairs/co-organizers through their email addresses
              and telephone numbers listed for each Forum.
            </p>
          </div>

          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'part-a' ? 'active' : ''}`}
              onClick={() => setActiveTab('part-a')}
            >
              Part A: Technical Forums (FA)
            </button>
            <button 
              className={`tab-btn ${activeTab === 'part-b' ? 'active' : ''}`}
              onClick={() => setActiveTab('part-b')}
            >
              Part B: Policy Forums (FB)
            </button>
            <button 
              className={`tab-btn ${activeTab === 'special' ? 'active' : ''}`}
              onClick={() => setActiveTab('special')}
            >
              Special Sessions (OSS)
            </button>
          </div>

          {activeTab === 'part-a' && (
            <div className="forums-content">
              <h3>Part A: Technical Forums (Environmental Geotechnology)</h3>
              <p className="part-description">
                August 10-11, 2026: 17 technical forums focusing on innovations in environmental geotechnology, 
                engineering solutions, and advanced technologies for sustainable development.
              </p>
              <div className="forums-grid">
                {technicalForums.map((forum, idx) => (
                  <div key={idx} className="forum-card technical">
                    <div className="forum-header">
                      <div className="forum-code">{forum.code}</div>
                      <button 
                        className={`expand-btn ${expandedForums[forum.code] ? 'expanded' : ''}`}
                        onClick={() => toggleForumExpanded(forum.code)}
                        title="Click to expand description"
                      >
                        ▼
                      </button>
                    </div>
                    <h4>{forum.title}</h4>
                    
                    {forum.organizers && forum.organizers.length > 0 && (
                      <div className="forum-organizers">
                        <h5>CO-ORGANIZERS</h5>
                        {forum.organizers.map((organizer, oIdx) => (
                          <div key={oIdx} className="organizer-item">
                            <p><strong>{organizer.name}</strong></p>
                            {organizer.email && <p>📧 <a href={`mailto:${organizer.email}`}>{organizer.email}</a></p>}
                            {organizer.phone && <p>📞 {organizer.phone}</p>}
                          </div>
                        ))}
                      </div>
                    )}

                    {expandedForums[forum.code] && (
                      <div className="forum-description-expanded">
                        <p className="full-description">{forum.fullDescription}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'part-b' && (
            <div className="forums-content">
              <h3>Part B: Policy Forums (Global Sustainable Development)</h3>
              <p className="part-description">
                August 13-15, 2026: 14 policy forums addressing global sustainable development, governance, 
                peace, education, and socioeconomic issues.
              </p>
              <div className="forums-grid">
                {policyForums.map((forum, idx) => (
                  <div key={idx} className="forum-card policy">
                    <div className="forum-header">
                      <div className="forum-code">{forum.code}</div>
                      <button 
                        className={`expand-btn ${expandedForums[forum.code] ? 'expanded' : ''}`}
                        onClick={() => toggleForumExpanded(forum.code)}
                        title="Click to expand description"
                      >
                        ▼
                      </button>
                    </div>
                    <h4>{forum.title}</h4>
                    
                    {forum.organizers && forum.organizers.length > 0 && (
                      <div className="forum-organizers">
                        <h5>CO-ORGANIZERS</h5>
                        {forum.organizers.map((organizer, oIdx) => (
                          <div key={oIdx} className="organizer-item">
                            <p><strong>{organizer.name}</strong></p>
                            {organizer.email && <p>📧 <a href={`mailto:${organizer.email}`}>{organizer.email}</a></p>}
                            {organizer.phone && <p>📞 {organizer.phone}</p>}
                          </div>
                        ))}
                      </div>
                    )}

                    {expandedForums[forum.code] && (
                      <div className="forum-description-expanded">
                        <p className="full-description">{forum.fullDescription}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'special' && (
            <div className="forums-content">
              <h3>Organizational Special Sessions</h3>
              <p className="part-description">
                Various international organizations will hold special sessions to showcase their initiatives, 
                programs, and contributions to sustainable development.
              </p>
              <div className="special-sessions-grid">
                {specialSessions.map((session, idx) => (
                  <div key={idx} className="special-session-card">
                    <div className="session-header">
                      <span className="session-code">{session.code}</span>
                      <button 
                        className={`expand-btn ${expandedForums[session.code] ? 'expanded' : ''}`}
                        onClick={() => toggleForumExpanded(session.code)}
                        title="Click to expand description"
                      >
                        ▼
                      </button>
                    </div>
                    <h4>{session.title}</h4>
                    <p className="organization">
                      <strong>Organization:</strong> {session.organization}
                    </p>
                    
                    {session.organizers && session.organizers.length > 0 && (
                      <div className="session-organizers">
                        <h5>CO-ORGANIZERS</h5>
                        {session.organizers.map((organizer, oIdx) => (
                          <div key={oIdx} className="organizer-item">
                            <p><strong>{organizer.name}</strong></p>
                            {organizer.email && <p>📧 <a href={`mailto:${organizer.email}`}>{organizer.email}</a></p>}
                            {organizer.phone && <p>📞 {organizer.phone}</p>}
                          </div>
                        ))}
                      </div>
                    )}

                    {expandedForums[session.code] && (
                      <div className="forum-description-expanded">
                        <p className="full-description">{session.fullDescription}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="forums-info">
            <h3>Forum Participation</h3>
            <p>
              All symposium registrants can participate in any of the forums or special sessions. 
              To present a paper or poster, abstract submission is required during the registration period.
            </p>
            <p>
              <strong>For specific inquiries about forums or to request a panelist role:</strong> 
              Contact the respective forum chairs using the information provided.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Forums
