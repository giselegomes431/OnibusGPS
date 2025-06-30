import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f7' },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === 'android' ? 25 : 15,
    paddingBottom: 15,
    height: 80,
    zIndex: 1,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },


  backdropContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },

  searchContainer: {
    position: "absolute",
    top: 60,
    width: "80%",
    alignSelf: "center",
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 35,
    padding: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchButton: {
    backgroundColor: "#127234",
    padding: 15,
    borderRadius: 35,
    alignItems: "center",
  },
  searchText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  suggestionList: {
    marginTop: 5,
    maxHeight: 300,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0,
    borderBottomColor: "#eee",
  },
  primaryText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },

  resultsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    top: 150,

  },
  placeholderText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },

  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#e9e9e9',
    borderRadius: 35,
    padding: 5,
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 35,
  },
  activeDayButton: {
    backgroundColor: '#127234',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activeDayButtonText: {
    color: 'white',
  },
  lineContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  lineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#127234',
    marginBottom: 10,
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que os horários quebrem a linha
  },
  timeText: {
    backgroundColor: '#e8f5e9',
    color: '#127234',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  noTimeText: {
    fontStyle: 'italic',
    color: '#999',
  }
});