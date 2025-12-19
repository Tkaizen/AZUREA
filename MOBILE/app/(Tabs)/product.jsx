import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../../services/api";

const DEFAULT_IMAGE = 'https://via.placeholder.com/150/0000FF/808080?text=No+Image';

export function Product() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Cars");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("hour");

  // Function to clear the form fields
  const resetForm = () => {
    setName("");
    setPrice("");
    setImage("");
    setCategory("Cars");
    setDescription("");
    setUnit("hour");
    setIsEditing(false);
    setCurrentProductId(null);
  };

  useEffect(() => {
    if (user?.token) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(user?.token);
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products:", error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name || !price || !category) {
      Alert.alert("Validation Error", "Please fill in Name, Price, and Category.");
      return;
    }

    if (isNaN(parseFloat(price))) {
      Alert.alert("Validation Error", "Price must be a valid number.");
      return;
    }

    if (!user?.token) {
      Alert.alert("Authentication Error", "You are not logged in. Please log in first.");
      return;
    }

    try {
      const productData = {
        name,
        price: parseFloat(price),
        image,
        category,
        description,
        unit
      };

      if (isEditing) {
        const result = await updateProduct(currentProductId, productData, user?.token);
        console.log("Product updated:", result);
        Alert.alert("Success", `Product "${result.name}" updated successfully!`);
      } else {
        const result = await createProduct(productData, user?.token);
        console.log("Product created:", result);
        Alert.alert("Success", `Product "${result.name}" added successfully!`);
      }

      setModalVisible(false);
      resetForm();
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error(isEditing ? "Update Error:" : "Create Error:", error.message);
      Alert.alert("Error", `Failed to ${isEditing ? "update" : "add"} product: ${error.message}`);
    }
  };

  const handleEditProduct = (item) => {
    setName(item.name);
    setPrice(item.price.toString());
    setImage(item.image);
    setCategory(item.category);
    setDescription(item.description);
    setUnit(item.unit || "hour");
    setCurrentProductId(item._id);
    setIsEditing(true);
    setModalVisible(true);
  };

  // --- Rendering Functions ---

  const handleDeleteProduct = async (id) => {
    console.log("handleDeleteProduct called with ID:", id); // DEBUG LOG

    // Auth check
    if (!user?.token) {
      console.log("No token found"); // DEBUG LOG
      Alert.alert("Error", "You must be logged in to delete products.");
      return;
    }

    try {
      console.log("Calling deleteProduct API..."); // DEBUG LOG
      await deleteProduct(id, user.token);
      console.log("Delete Successful"); // DEBUG LOG
      // Optional: Show a quick toast or valid feedback if needed, but for now silent success/refresh
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error("Delete Error:", error);
      Alert.alert("Error", `Failed to delete product: ${error.message}`);
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <TouchableOpacity
        style={styles.productContent}
        onPress={() => router.push(`/product/${item._id}`)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.image || DEFAULT_IMAGE }}
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price} / {item.unit}</Text>
          <Text style={styles.productCategory}>Category: {item.category}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => handleEditProduct(item)}
          style={[styles.iconButton, styles.editButton]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.iconButtonText}>✎</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteProduct(item._id)}
          style={[styles.iconButton, styles.deleteButton]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.iconButtonText}>✖️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!user?.token) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Product Management</Text>
        <Text style={styles.errorText}>Please log in to manage products.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Products</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loading} />
      ) : products.length === 0 ? (
        <Text style={styles.emptyText}>No cars available. Add one!</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={renderProductItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => { resetForm(); setModalVisible(true); }}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      {/* Create Product Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false); resetForm(); }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{isEditing ? "Edit Car" : "Add New Car"}</Text>

            <TextInput
              style={styles.input}
              placeholder="Tesla Model S"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="120"
              placeholderTextColor="#999"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="https://images.unsplash.co..."
              placeholderTextColor="#999"
              value={image}
              onChangeText={setImage}
            />
            <TextInput
              style={styles.input}
              placeholder="hour"
              placeholderTextColor="#999"
              value={unit}
              onChangeText={setUnit}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="A luxury electric sedan with..."
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
              multiline={true}
            />

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.modalButton, styles.buttonCancel]}
                onPress={() => { setModalVisible(false); resetForm(); }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.buttonCreate]}
                onPress={handleSubmit}
              >
                <Text style={styles.textStyle}>{isEditing ? "Save Changes" : "Add Car"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#0d1b2a',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#aaa',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#ff6b6b',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingTop: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#1b263b',
    borderRadius: 12,
    padding: 30,
    alignItems: 'stretch',
    width: '90%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 45,
    backgroundColor: '#0d1b2a',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 0,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  modalButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  buttonCancel: {
    backgroundColor: '#6c757d',
  },
  buttonCreate: {
    backgroundColor: '#1b4de4',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 80,
    backgroundColor: '#1b4de4',
    borderRadius: 30,
    elevation: 8,
    zIndex: 10,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 30,
    lineHeight: 30,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#1b263b',
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    overflow: 'hidden', // Ensure child views respect border radius
  },
  productContent: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#0d1b2a',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  productPrice: {
    fontSize: 14,
    color: '#aaa',
    fontWeight: '600',
    marginTop: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 8,
    gap: 8,
    justifyContent: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
  },
  editButton: {
    backgroundColor: '#ffc107',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  iconButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loading: {
    marginTop: 50,
  },
  listContent: {
    paddingBottom: 100,
  }
});