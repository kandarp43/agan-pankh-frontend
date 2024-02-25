export default function AboutUs() {
	return (
		<>
			<h1 className='text-xl mb-2 py-6 bg-emerald-700 text-white font-extrabold underline underline-offset-2 w-full text-center'>
				About Us
			</h1>
			<div className='mx-auto mb-6 max-w-[600px] px-3 text-center'>
				<div className='english mb-5 border-b border-b-primary pb-5 font-semibold'>
					<p className='mb-6 font-bold underline underline-offset-2'>
						Mission Statement of Aganpankh Academic Institute:
					</p>
					<p className='mb-3'>
						"At Aganpankh, our mission is to empower and prepare aspiring
						candidates for civil services through comprehensive education and
						specialized training. We are committed to fostering a dynamic
						learning environment that promotes critical thinking, ethical
						leadership, and holistic development. Through innovative pedagogical
						approaches and personalized guidance, we aim to nurture individuals
						who are equipped with the knowledge, skills, and values necessary to
						excel in competitive examinations and contribute meaningfully to
						society."
					</p>
					<p className='mb-1 underline underline-offset-2 text-slate-900'>
						A collective effort by
					</p>
					<p>- Dr. Hiren Jogi</p>
					<p>- Dr. Yatri Tej Banugariya</p>
					<p>- Mrs. Devika Haresh Vavadiya</p>
					<p>- Mrs. Urvi Jagadish Sankharva</p>
					<p>- CA Dhaval Bhojani</p>
				</div>
				<div className='gujarati font-semibold'>
					<p className='mb-3'>
						"અગનપંખ ખાતે, અમારું ધ્યેય વિશિષ્ટ તાલીમ દ્વારા સનદીસેવાઓ માટે
						મહત્વાકાંક્ષી ઉમેદવારોને તૈયાર કરવાનું છે. અમે એક ગતિશીલ શૈક્ષણિક
						વાતાવરણને પ્રોત્સાહન આપવા માટે પ્રતિબદ્ધ છીએ જે નૈતિક નેતૃત્વ અને
						સર્વગ્રાહી વિકાસને પ્રોત્સાહન આપે. નવીન શિક્ષણશાસ્ત્રના અભિગમો અને
						વ્યક્તિગત માર્ગદર્શન દ્વારા અમારું લક્ષ્ય એવી વ્યક્તિઓને ઉછેરવાનું
						છે કે જેઓ સ્પર્ધાત્મક પરીક્ષાઓમાં ઉત્કૃષ્ટ દેખાવ કરવા અને સમાજમાં
						અર્થપૂર્ણ યોગદાન આપવા માટે જરૂરી જ્ઞાન અને મૂલ્યોથી સજ્જ છે."
					</p>
					<p className='mb-1 underline underline-offset-2 font-bold text-slate-900'>
						સહિયારો પ્રયાસ
					</p>
					<p>- Dr. Hiren Jogi</p>
					<p>- Dr. Yatri Tej Banugariya</p>
					<p>- Mrs. Devika Haresh Vavadiya</p>
					<p>- Mrs. Urvi Jagadish Sankharva</p>
					<p>- CA Dhaval Bhojani</p>
				</div>
			</div>
			<div className='mt-6 bg-emerald-700 text-white rounded-t-3xl'>
				<div className='mx-auto py-8 max-w-[800px] px-3 flex sm:flex-row flex-col gap-4'>
					<div className='text-xs flex-grow'>
						<p className='font-semibold mb-3 text-sm underline underline-offset-2'>
							શૈક્ષણિક હેતુ:{' '}
						</p>
						<p>
							આ પ્રેક્ટિસ પરીક્ષા પોર્ટલ ફક્ત શૈક્ષણિક હેતુઓ માટે બનાવાયેલ છે
							અને પરીક્ષણોના ડેમો નિરૂપણ તરીકે છે. તે વિદ્યાર્થીઓને પરીક્ષાના
							ફોર્મેટથી પોતાને પરિચિત કરવામાં અને તેમના જ્ઞાનનું મૂલ્યાંકન
							કરવામાં મદદ કરવા માટે રચાયેલ છે. વિદ્યાર્થીઓ પરીક્ષાના સાચા અનુભવ
							માટે પોતાના મોબાઈલ ને બદલે કોમ્પ્યુટર પર અહીં આપેલ પરીક્ષાનો અનુભવ
							લે એ સલાહ ભરેલું છે. અહીં આપેલા પ્રશ્નો અને સામગ્રી અધિકૃત
							પરીક્ષાના પ્રશ્નો નથી અને તેનો અર્થ એવો ન કરવો જોઈએ.
						</p>
					</div>
					<div>
						<p className='text-sm leading-4'>
							For further details write on
							<a
								className='block transition underline underline-offset-2 text-warning-500 hover:text-warning-400 font-bold'
								href='mailto:hirenjogi.82@gmail.com'
							>
								hirenjogi.82@gmail.com
							</a>
						</p>
					</div>
				</div>
			</div>
			<div className='py-3 bg-stone-900 text-white'>
				<div className='mx-auto max-w-[800px] px-3 flex sm:flex-row flex-col text-sm'>
					<p className='mr-2'>Developed by </p>
					<a
						className='text-warning underline hover:no-underline underline-offset-4 font-bold'
						href='https://www.linkedin.com/in/shrey-banugaria/'
						rel='noreferrer'
						target='_blank'
					>
						Shrey Banugaria
					</a>
					<p className='px-2'>and</p>
					<a
						className='text-warning underline hover:no-underline underline-offset-4 font-bold'
						href='https://www.linkedin.com/in/kandarp43/'
						rel='noreferrer'
						target='_blank'
					>
						Kandarp Dangi
					</a>
				</div>
			</div>
		</>
	)
}
