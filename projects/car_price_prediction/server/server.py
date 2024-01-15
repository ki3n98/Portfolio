from flask import Flask, request, jsonify
import util

app = Flask(__name__)


@app.route('/get_manufacturer_name')
def get_manufacturer_name():
    response = jsonify(
        util.get_manufacturer_names()
    )
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/get_category')
def get_category():
    response = jsonify(
        util.get_category()
    )
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/get_gearbox')
def get_gearbox():
    response = jsonify(
        util.get_gear_box()
    )
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/predict_car_price', methods=['POST'])
def predict_car_price():
    # levy, manufacture_dict[manufacturer], category_dict[category], leather_interior, mileage,
    # gear_box_dict[gear_box_type], airbags, age
    levy = int(request.form['levy'])
    manufacture = request.form['manufacture']
    category = request.form['category']
    leather_interior = int(request.form['leather_interior'])
    mileage = float(request.form['mileage'])
    gear_box = request.form['gear_box']
    airbags = int(request.form['airbags'])
    age = int(request.form['age'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(levy, manufacture,
                                                    category, leather_interior,
                                                    mileage, gear_box,
                                                    airbags, age)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    print("Starting Python Flask Sever for Car Price Prediction...")
    app.run()

