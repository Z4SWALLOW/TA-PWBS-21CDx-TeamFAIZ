<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHewanlautsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hewanlauts', function (Blueprint $table) {
            $table->id();
            $table->char('no', 255);
            $table->string('nama', 100);
            $table->enum('jenis', ["Ikan Air Asin", "Ikan Air Tawar", "Ikan Air Payau", "Terumbu Karang"]);
            $table->text('deskripsi');
            $table->string('gambar')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hewanlauts');
    }
}
