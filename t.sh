for (( i = 2; i <= 5; ++i))
do
	echo "1" >> t.txt
	git add "t.txt"
	git commit -m "t"
	git push
done
