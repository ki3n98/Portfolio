import json
import pickle
import numpy as np

__manufacturers = None
__categories = None
__gear_box_types = None
__feature_names = None

__model = None


def load_saved_artifacts():
    print("Loading saved artifacts")
    # access the global variable
    global __manufacturers
    global __categories
    global __gear_box_types
    global __feature_names
    global __model

    # get dictionaries
    # with open("./artifacts/Manufacturer_dict.json", 'r') as f:
    #     __manufacturers = json.load(f)

    load_manufacturer_names()
    load_category()
    load_gearbox()

    with open("./artifacts/feature_names.json", 'r') as f:
        __feature_names = json.load(f)

    with open("./artifacts/used_car_prices_model.pickle", 'rb') as f:  # 'rb' means read binary
        __model = pickle.load(f)

    print('Finished loading Artifact')


def load_manufacturer_names():
    global __manufacturers
    with open("./artifacts/Manufacturer_dict.json", 'r') as f:
        __manufacturers = json.load(f)


def load_category():
    global __categories
    with open("./artifacts/category_dict.json", 'r') as f:
        __categories = json.load(f)


def load_gearbox():
    global __gear_box_types
    with open("./artifacts/gear_box_dict.json", 'r') as f:
        __gear_box_types = json.load(f)


def get_manufacturer_names():
    load_manufacturer_names()
    return list(__manufacturers.keys())


def get_category():
    load_category()
    return list(__categories.keys())


def get_gear_box():
    load_gearbox()
    return list(__gear_box_types)


def get_estimated_price(levy, manufacturer, category,
                        leather_interior, mileage,
                        gear_box_type, airbags, age):
    global __manufacturers
    global __categories
    global __gear_box_types
    global __feature_names
    global __model

    load_saved_artifacts()

    # levy, manufacture_dict[manufacturer], category_dict[category], leather_interior, mileage,
    # gear_box_dict[gear_box_type], airbags, age
    x = np.array([levy, __manufacturers[manufacturer.upper()],
                  __categories[category.upper()], leather_interior,
                  mileage, __gear_box_types[gear_box_type.upper()],
                  airbags, age])

    return float(np.round(__model.predict([x]), 2))




if __name__ == '__main__':
    load_saved_artifacts()

    print(get_estimated_price(1399, 'Lexus',
                       'jEEp', 1,
                       186005, 'automatic',
                       12, 12)
          )

    print(type(__manufacturers))