const api = axios.create({
	baseURL: 'https://api.thecatapi.com/v1',
	headers: {'X-API-KEY': '07026512-1447-4d9e-a2da-abaa991c74d7'}
});


//references DOM
const savecats = document.getElementById('savecats');
const btnsave1 = document.querySelector('.btn-save1');
const btnsave2 = document.querySelector('.btn-save2');
const btnsave3 = document.querySelector('.btn-save3');
const main__random = document.getElementById('main__random');
const btnrandom = document.getElementById('btnrandom');
const error = document.getElementById('error');
const uploadFile = document.getElementById('uploadFile');


async function catRandom() {
	const {data, status} = await api.get('/images/search?limit=3');

	if(status !== 200) 
	{
		error.innerHTML = `Hubo un error: ${status}`
	} 
	else 
	{

		let img1 = document.getElementById('img1');
		let img2 = document.getElementById('img2');
		let img3 = document.getElementById('img3');

		img1.src=data[0].url;
		img2.src=data[1].url;
		img3.src=data[2].url;

		btnsave1.addEventListener('click', () => saveFavoriteCat(data[0].id))
		btnsave2.addEventListener('click', () => saveFavoriteCat(data[1].id))
		btnsave3.addEventListener('click', () => saveFavoriteCat(data[2].id))
	}
	console.log('cats random')
	console.log(data)
}

	try {
		catRandom();
	} catch(error) {
		console.log('Hubo un error: ' + error)
	}

	btnrandom.addEventListener('click', catRandom)





//obtener cats favorite
async function catFavorite() {

	const { data, status } = await api.get('/favourites')

	if(status !== 200) 
	{
		error.innerHTML = `<h2>Error en favoritos</h2> <br> <img src=https://http.cat/${status} />`
	}
	else
	{
		savecats.innerHTML = '';
		data.forEach(items => 
			{

			const section = document.createElement('section');
			const img = document.createElement('img');
			const btn = document.createElement('button');

			btn.textContent = 'X'
			section.className = 'delete-section'
			btn.className = 'btn-delete'
			
			img.src = items.image.url;
			btn.addEventListener('click', () => deleteCat(items.id))

			section.appendChild(img);
			section.appendChild(btn);
			savecats.appendChild(section)

		})
	}  

}


	//agregar a cat to favorite
	async function saveFavoriteCat(id) {
		const {data, status} = await api.post('/favourites', {
			image_id: id,
		});

		if(status !== 200) 
		{
			error.innerHTML = `<h2>Error en favoritos: ${data.message}</h2> <br> <img src=https://http.cat/${status} />`
		}
		else
			{
				console.log('se ha guardado')
				
				catFavorite()
			}
	}

	try{

		catFavorite()
	} catch(error) {
		console.log(error)
	}


	async function deleteCat(id) {
		const {data, status } = await api.delete(`/favourites/${id}`);

		if(status !== 200) {
			error.innerHTML = `<h2>Error en favoritos: ${data.message}</h2> <br> <img src=https://http.cat/${status} />`
		} else {
			console.log('se ha borrado')
			catFavorite()
		}
	}



	async function uploadCat () {
		const form = document.getElementById('uploadForm');
		const formData = new FormData(form);


		const res = await fetch(API_UPLOAD, {
			method: 'POST',
			headers: {
				// 'Content-Type': 'multipart/form-data',
				'X-API-KEY': '07026512-1447-4d9e-a2da-abaa991c74d7',
			},
			body: formData,
		})

		const data = await res.json();

		if(res.status !== 200 && res.status !== 201) {
			error.innerHTML = `<h2>Error en favoritos ${data.message}</h2> <br> <img src=https://http.cat/${res.status} />`
			console.log({data})
		} else {
			console.log('se ha subido la imagen')
			console.log({data})
			console.log(data.url)
			saveFavoriteCat(data.id)
		}

	}

	uploadFile.addEventListener('click', uploadCat)



	btnsave1.addEventListener('click', () => {
		let click = new Audio('./assets/sounds/save.mp3');
		click.play()
	})
	btnsave2.addEventListener('click', () => {
		let click = new Audio('./assets/sounds/save.mp3');
		click.play()
	})
	btnsave3.addEventListener('click', () => {
		let click = new Audio('./assets/sounds/save.mp3');
		click.play()
	})